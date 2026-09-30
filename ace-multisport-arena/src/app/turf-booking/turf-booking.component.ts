import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SlotCardComponent } from '../shared/slot-card.component';
import { Slot, SlotStatus } from '../shared/models/arena.models';

@Component({
  selector: 'app-turf-booking', standalone: true, imports: [CommonModule, FormsModule, RouterLink, SlotCardComponent],
  templateUrl: './turf-booking.component.html'
})
export class TurfBookingComponent {
  selectedDate = '';
  selectedSlots: number[] = [];
  readonly hours = Array.from({ length: 16 }, (_, index) => index + 7);
  readonly blockedSlots: Record<number, SlotStatus> = { 9: 'BOOKED', 12: 'BLOCKED', 16: 'ADMIN_RESERVED', 20: 'PAYMENT_PENDING' };
  readonly mockHourlyPrice = 1200; // Explicitly illustrative preview value; replace with PricingService data.
  errorMessage = '';
  readonly minDate = new Date().toISOString().slice(0, 10);

  toggleSlot(hour: number): void {
    if (this.blockedSlots[hour]) return;
    this.selectedSlots = this.selectedSlots.includes(hour)
      ? this.selectedSlots.filter((slot) => slot !== hour)
      : [...this.selectedSlots, hour].sort((a, b) => a - b);
  }

  getSlot(hour: number): Slot { return { id: `slot-${hour}`, turfId: 'ace-turf', date: this.selectedDate, startTime: this.formatHour(hour), endTime: this.formatHour(hour + 1), status: this.blockedSlots[hour] ?? 'AVAILABLE', price: this.mockHourlyPrice }; }
  slotStatus(hour: number): SlotStatus { return this.selectedSlots.includes(hour) ? 'SELECTED' : this.blockedSlots[hour] ?? 'AVAILABLE'; }
  get continuous(): boolean { return this.selectedSlots.length < 2 || this.selectedSlots.every((hour, index, list) => index === 0 || hour === list[index - 1] + 1); }
  get duration(): number { return this.selectedSlots.length; }
  get total(): number { return this.duration * this.mockHourlyPrice; }
  continueToLogin(): void { this.errorMessage = 'Booking creation requires the backend API. No booking or payment has been created.'; }

  formatHour(hour: number): string {
    const suffix = hour < 12 ? 'AM' : 'PM';
    const display = hour % 12 || 12;
    return `${display}:00 ${suffix}`;
  }

  get readableDate(): string {
    if (!this.selectedDate) return 'Choose a date';
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${this.selectedDate}T00:00:00Z`));
  }
}
