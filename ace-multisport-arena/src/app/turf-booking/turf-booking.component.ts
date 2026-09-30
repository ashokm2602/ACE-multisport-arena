import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-turf-booking', standalone: true, imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './turf-booking.component.html'
})
export class TurfBookingComponent {
  selectedDate = '';
  selectedSlots: number[] = [];
  readonly hours = Array.from({ length: 24 }, (_, hour) => hour);
  readonly minDate = new Date().toISOString().slice(0, 10);

  toggleSlot(hour: number): void {
    this.selectedSlots = this.selectedSlots.includes(hour)
      ? this.selectedSlots.filter((slot) => slot !== hour)
      : [...this.selectedSlots, hour].sort((a, b) => a - b);
  }

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
