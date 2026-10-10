import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getHourlyTurfPrice, TurfBookingComponent } from './turf-booking.component';

describe('TurfBookingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TurfBookingComponent], providers: [provideRouter([])] }).compileComponents();
  });

  it('offers exactly the local 14-day booking window and rejects a date switch during a selection', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    const component = fixture.componentInstance;
    const today = component.minDate;
    const lastDay = component.maxDate;
    const tomorrow = component.dateKey(component.bookingDates[1]);

    expect(component.bookingDates).toHaveLength(14);
    expect(component.dateKey(component.bookingDates[0])).toBe(today);
    expect(component.dateKey(component.bookingDates[13])).toBe(lastDay);
    expect(component.canGoPrevious).toBe(false);
    expect(component.canGoNext).toBe(true);
    component.moveDateWindow(-1);
    expect(component.dateWindowStart).toBe(0);
    component.moveDateWindow(1);
    expect(component.dateWindowStart).toBe(7);
    expect(component.canGoNext).toBe(false);

    component.onDateChange(today);
    component.selectPeriod('under-lights');
    component.trySelectSlot(18);
    component.onDateChange(tomorrow);
    expect(component.selectedDate).toBe(today);
    expect(component.selectedSlots).toHaveLength(1);
    expect(component.toastMessage).toContain('Clear your current booking range');

    const outsideWindow = new Date(`${lastDay}T00:00:00`);
    outsideWindow.setDate(outsideWindow.getDate() + 1);
    component.clearSelection();
    component.dismissToast();
    component.onDateChange(component.dateKey(outsideWindow));
    expect(component.selectedDate).toBe(today);
    fixture.destroy();
  });

  it('prices weekdays at ₹600 and weekends at ₹750 using the selected date', () => {
    expect(getHourlyTurfPrice('2026-10-09')).toBe(600); // Friday
    expect(getHourlyTurfPrice('2026-10-10')).toBe(750); // Saturday
    expect(getHourlyTurfPrice('2026-10-11')).toBe(750); // Sunday
    expect(getHourlyTurfPrice('2026-10-12')).toBe(600); // Monday
  });

  it('covers every operating hour exactly once with the ACE play windows', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    const component = fixture.componentInstance;
    const allHours: number[] = [];
    for (const period of component.periods) {
      component.selectPeriod(period.id);
      allHours.push(...component.periodSlots);
      expect(component.periodSlots.every((hour) => hour >= 0 && hour <= 23)).toBe(true);
    }
    expect(component.periods.map(({ label }) => label)).toEqual(['First Light', 'Daybreak', 'Prime Play', 'Under Lights', 'Overnight']);
    expect(component.periods.map((period) => [component.formatHour(period.start), component.formatHour(period.end % 24)])).toEqual([
      ['6 AM', '10 AM'], ['10 AM', '2 PM'], ['2 PM', '6 PM'], ['6 PM', '12 AM'], ['12 AM', '6 AM']
    ]);
    expect([...allHours].sort((a, b) => a - b)).toEqual(Array.from({ length: 24 }, (_, hour) => hour));
    expect(new Set(allHours).size).toBe(24);
    expect(component.periods.map((period) => period.end - period.start)).toEqual([4, 4, 4, 6, 6]);
    expect(component.formatSlotRange(23)).toBe('11:00 PM–12:00 AM');
    fixture.destroy();
  });

  it('uses the ACE booking language and exposes all play windows as labelled buttons', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    const text = (page.textContent ?? '').replace(/\s+/g, ' ');
    const heading = page.querySelector('h1');
    expect(`${heading?.childNodes[0]?.textContent?.trim()} ${heading?.querySelector('span')?.textContent?.trim()}`).toBe('OWN THE HOUR.');
    expect(text).toContain('Your game. Your time. Your arena.');
    expect(text).toContain('Pick Your Day');
    expect(text).toContain('Choose Your Play Window');
    expect(text).toContain('Available to Play');
    expect(text).toContain('Your Play Plan');
    expect(text).toContain('Your game is taking shape.');
    expect(page.querySelector('.booking-progress')?.getAttribute('aria-label')).toBe('Choose Day → Pick Hours → Review');
    expect(page.querySelectorAll('.period-filter')).toHaveLength(5);
    expect(page.querySelectorAll('.period-filter[aria-pressed="true"]')).toHaveLength(1);
    fixture.destroy();
  });

  it('allows only an adjacent same-date range, supports shrinking, and explains invalid clicks', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    const component = fixture.componentInstance;
    const date = component.minDate;
    component.onDateChange(date);
    component.selectPeriod('under-lights');

    component.trySelectSlot(18);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18]);
    expect(component.selectedRangeDisplay).toBe('6 PM–7 PM · 1 hour');
    expect(component.toastMessage).toContain('6:00 PM–7:00 PM selected');
    component.trySelectSlot(20);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18]);
    expect(component.toastMessage).toContain('Choose the next available hour');

    component.trySelectSlot(19);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18, 19]);
    expect(component.selectedRangeDisplay).toBe('6 PM–8 PM · 2 hours');
    expect(component.estimatedTotal).toBe(getHourlyTurfPrice(date) * 2);
    component.selectPeriod('prime-play');
    component.trySelectSlot(17);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([17, 18, 19]);
    component.selectPeriod('under-lights');
    component.trySelectSlot(18);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([17, 18, 19]);
    expect(component.toastMessage).toContain('Choose the next available hour');

    component.selectPeriod('prime-play');
    component.trySelectSlot(17);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18, 19]);
    component.selectPeriod('under-lights');
    component.trySelectSlot(19);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18]);
    component.trySelectSlot(18);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([18]);
    expect(component.toastMessage).toContain('Clear selection');
    fixture.destroy();
  });

  it('does not allow extending through an unavailable slot and can clear the range', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    const component = fixture.componentInstance;
    component.onDateChange(component.minDate);
    component.selectPeriod('under-lights');
    component.trySelectSlot(21);
    component.trySelectSlot(22);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([21]);
    expect(component.toastMessage).toContain('This slot is unavailable');
    component.trySelectSlot(23);
    expect(component.selectedSlots.map((slot) => slot.hour)).toEqual([21]);
    expect(component.toastMessage).toContain('Choose the next available hour');
    component.clearSelection();
    expect(component.selectedSlots).toEqual([]);
    expect(component.estimatedTotal).toBe(0);
    expect(component.toastMessage).toContain('Booking selection cleared');
    fixture.destroy();
  });

  it('renders selected pricing and keeps final booking disabled without a booking API', () => {
    const fixture = TestBed.createComponent(TurfBookingComponent);
    const component = fixture.componentInstance;
    const weekend = component.bookingDates.find((date) => date.getDay() === 0 || date.getDay() === 6)!;
    component.onDateChange(component.dateKey(weekend));
    component.selectPeriod('under-lights');
    component.trySelectSlot(18);
    component.trySelectSlot(19);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('.time-slot.selected')).toHaveLength(2);
    expect(page.querySelector('.summary-total')?.textContent).toContain('₹1,500');
    expect((page.querySelector('.continue-button') as HTMLButtonElement).disabled).toBe(true);
    expect(page.textContent).toContain('Final booking confirmation is not connected yet');
    expect(page.textContent).toContain('Slot availability is illustrative');
    fixture.destroy();
  });
});
