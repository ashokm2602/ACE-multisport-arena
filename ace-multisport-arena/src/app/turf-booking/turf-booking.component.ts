import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurfSlotSelectionService } from './turf-slot-selection.service';

type TimePeriod = { id: string; label: string; start: number; end: number; icon: string };

export function getHourlyTurfPrice(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  const weekday = new Date(year, month - 1, day).getDay();
  return weekday === 0 || weekday === 6 ? 750 : 600;
}

@Component({
  selector: 'app-turf-booking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [TurfSlotSelectionService],
  templateUrl: './turf-booking.component.html'
})
export class TurfBookingComponent implements OnInit, OnDestroy {
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly slotSelection = inject(TurfSlotSelectionService);
  selectedDate = '';
  selectedPeriod = 'under-lights';
  dateWindowStart = 0;
  readonly bookingEnabled = false;
  private dateRefreshTimer?: ReturnType<typeof setInterval>;
  private toastTimer?: ReturnType<typeof setTimeout>;
  toastMessage = '';

  readonly periods: TimePeriod[] = [
    { id: 'first-light', label: 'First Light', start: 6, end: 10, icon: '◒' },
    { id: 'daybreak', label: 'Daybreak', start: 10, end: 14, icon: '◔' },
    { id: 'prime-play', label: 'Prime Play', start: 14, end: 18, icon: '◉' },
    { id: 'under-lights', label: 'Under Lights', start: 18, end: 24, icon: '✦' },
    { id: 'overnight', label: 'Overnight', start: 0, end: 6, icon: '☾' }
  ];

  // Illustrative preview availability only; this is not live or court-specific.
  readonly unavailableSampleHours = new Set([2, 9, 14, 22]);
  readonly visibleDateCount = 7;

  get minDate(): string { return this.toLocalDateString(new Date()); }

  get maxDate(): string {
    const lastBookingDay = new Date();
    lastBookingDay.setDate(lastBookingDay.getDate() + 13);
    return this.toLocalDateString(lastBookingDay);
  }

  get bookingDates(): Date[] {
    const dates: Date[] = [];
    const today = this.localDateFromString(this.minDate);
    for (let offset = 0; offset < 14; offset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);
      dates.push(date);
    }
    return dates;
  }

  get visibleDates(): Date[] { return this.bookingDates.slice(this.dateWindowStart, this.dateWindowStart + this.visibleDateCount); }
  get canGoPrevious(): boolean { return this.dateWindowStart > 0; }
  get canGoNext(): boolean { return this.dateWindowStart + this.visibleDateCount < this.bookingDates.length; }
  get activePeriod(): TimePeriod { return this.periods.find((period) => period.id === this.selectedPeriod) ?? this.periods[3]; }
  get periodSlots(): number[] { return Array.from({ length: this.activePeriod.end - this.activePeriod.start }, (_, index) => this.activePeriod.start + index); }
  get hasAvailablePeriodSlots(): boolean { return this.periodSlots.some((hour) => this.isSlotAvailable(hour)); }
  get hasAllowedDate(): boolean { return this.isDateAllowed(this.selectedDate); }
  get selectedSlots(): { date: string; hour: number }[] {
    const range = this.slotSelection.range;
    return range ? this.slotSelection.hours.map((hour) => ({ date: range.date, hour })) : [];
  }
  get selectedRange() { return this.slotSelection.range; }
  get selectedDurationHours(): number { return this.selectedSlots.length; }
  get estimatedTotal(): number { return this.selectedDurationHours * this.priceForDate(this.selectedRange?.date ?? this.selectedDate); }
  get selectedHourlyPrice(): number { return this.priceForDate(this.selectedRange?.date ?? this.selectedDate); }
  get selectionStartTime(): string { return this.selectedRange ? this.formatHour(this.selectedRange.startHour) : '—'; }
  get selectionEndTime(): string { return this.selectedRange ? this.formatHour(this.selectedRange.endHour % 24) : '—'; }
  get selectedRangeDisplay(): string {
    if (!this.selectedRange) return '';
    const duration = this.selectedDurationHours;
    return `${this.selectionStartTime}–${this.selectionEndTime} · ${duration} ${duration === 1 ? 'hour' : 'hours'}`;
  }
  get summaryDate(): string {
    return this.selectedRange ? this.formatBookingDate(this.selectedRange.date) : this.readableDate;
  }

  ngOnInit(): void {
    this.dateRefreshTimer = setInterval(() => {
      this.dateWindowStart = Math.min(this.dateWindowStart, Math.max(0, this.bookingDates.length - this.visibleDateCount));
      if (this.selectedDate && !this.isDateAllowed(this.selectedDate)) {
        this.selectedDate = '';
        this.slotSelection.clear();
      }
      this.changeDetector.markForCheck();
    }, 60_000);
  }

  ngOnDestroy(): void {
    if (this.dateRefreshTimer) clearInterval(this.dateRefreshTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  onDateChange(date: string): void {
    if (!this.isDateAllowed(date)) return;
    if (this.selectedRange && date !== this.selectedRange.date) {
      this.showToast('Clear your current booking range before choosing another date.');
      return;
    }
    this.selectedDate = date;
  }

  moveDateWindow(direction: -1 | 1): void {
    this.dateWindowStart = Math.max(0, Math.min(this.bookingDates.length - this.visibleDateCount, this.dateWindowStart + direction * this.visibleDateCount));
  }

  selectPeriod(periodId: string): void {
    if (this.periods.some((period) => period.id === periodId)) this.selectedPeriod = periodId;
  }

  trySelectSlot(hour: number): void {
    if (!this.hasAllowedDate || !this.periodSlots.includes(hour)) return;
    const result = this.slotSelection.toggle(this.selectedDate, hour, this.isSlotAvailable(hour));
    switch (result.type) {
      case 'selected':
        this.showToast(`${this.formatSlotRange(hour)} selected · Duration: 1 hour · Total: ${this.formatCurrency(this.estimatedTotal)}`);
        break;
      case 'extended':
        this.showToast(`Booking extended ${hour === result.range.startHour ? 'from ' + this.formatDetailedHour(result.range.startHour) : 'to ' + this.formatDetailedHour(result.range.endHour % 24)} · Duration: ${this.selectedDurationHours} hours · Total: ${this.formatCurrency(this.estimatedTotal)}`);
        break;
      case 'shrunk':
        this.showToast(`Range shortened · Duration: ${this.selectedDurationHours} ${this.selectedDurationHours === 1 ? 'hour' : 'hours'} · Total: ${this.formatCurrency(this.estimatedTotal)}`);
        break;
      case 'unavailable':
        this.showToast('This slot is unavailable. Choose another available time.');
        break;
      case 'different-date':
        this.showToast('A booking range must stay on one date. Clear your selection to start again.');
        break;
      case 'last-slot':
        this.showToast('Use “Clear selection” to remove your final hour.');
        break;
      case 'interior':
      case 'non-consecutive':
        this.showToast('Choose the next available hour to extend your booking. For a different time, clear your current selection first.');
        break;
    }
  }

  clearSelection(): void {
    if (this.slotSelection.clear()) this.showToast('Booking selection cleared.');
  }

  notifyUnavailableSlot(): void { this.showToast('This slot is unavailable. Choose another available time.'); }

  onSlotPointerDown(hour: number): void { if (!this.isSlotAvailable(hour)) this.notifyUnavailableSlot(); }

  dismissToast(): void {
    this.toastMessage = '';
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
      this.changeDetector.markForCheck();
    }, 4200);
  }

  isSlotAvailable(hour: number): boolean { return !this.unavailableSampleHours.has(hour); }
  isSlotSelected(hour: number): boolean { return this.slotSelection.hours.includes(hour) && this.selectedRange?.date === this.selectedDate; }
  priceForDate(date: string): number { return date ? getHourlyTurfPrice(date) : 0; }
  formatCurrency(amount: number): string { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount); }
  formatHour(hour: number): string { return this.formatClockHour(hour); }
  formatSlotRange(hour: number): string { return `${this.formatDetailedHour(hour)}–${this.formatDetailedHour((hour + 1) % 24)}`; }
  formatBookingDate(date: string): string { return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)); }

  formatDate(date: Date, options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('en', options).format(date);
  }

  dateKey(date: Date): string { return this.toLocalDateString(date); }

  get readableDate(): string {
    if (!this.selectedDate) return 'Choose a date';
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${this.selectedDate}T00:00:00Z`));
  }

  private formatClockHour(hour: number): string {
    const normalizedHour = hour % 24;
    const suffix = normalizedHour < 12 ? 'AM' : 'PM';
    return `${normalizedHour % 12 || 12} ${suffix}`;
  }

  private formatDetailedHour(hour: number): string {
    const normalizedHour = hour % 24;
    const suffix = normalizedHour < 12 ? 'AM' : 'PM';
    return `${normalizedHour % 12 || 12}:00 ${suffix}`;
  }

  private isDateAllowed(date: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
    const parsedDate = this.localDateFromString(date);
    return this.toLocalDateString(parsedDate) === date && date >= this.minDate && date <= this.maxDate;
  }

  private localDateFromString(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private toLocalDateString(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
