import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TurfSlot, TurfSlotService } from '../features/slots/turSlotService';

@Component({
  selector: 'app-turf-booking', standalone: true, imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './turf-booking.component.html'
})
export class TurfBookingComponent {
  selectedDate = '';
  selectedSlots = signal<number[]>([]);
  slots = signal<TurfSlot[]>([]);
  loadingSlots = signal(false);
  slotsError = signal('');
  selectedSlotDetails = computed(() =>
    this.slots().filter((slot) => this.selectedSlots().includes(slot.id)),
  );
  readonly minDate = new Date().toISOString().slice(0, 10);

  private requestNumber = 0;

  constructor(private readonly turfSlotService: TurfSlotService) {}

  onDateChange(date: string): void {
    const request = ++this.requestNumber;
    this.selectedSlots.set([]);
    this.slots.set([]);
    this.slotsError.set('');
    this.loadingSlots.set(Boolean(date));
    if (!date) return;

    this.turfSlotService.getByDate(date).subscribe({
      next: (slots) => {
        if (request !== this.requestNumber) return;
        this.slots.set([...slots].sort((a, b) => a.startTime.localeCompare(b.startTime)));
        this.loadingSlots.set(false);
      },
      error: () => {
        if (request !== this.requestNumber) return;
        this.slotsError.set('Could not load availability. Please try again.');
        this.loadingSlots.set(false);
      },
    });
  }

  toggleSlot(slotId: number): void {
    this.selectedSlots.update((selected) => selected.includes(slotId)
      ? selected.filter((id) => id !== slotId)
      : [...selected, slotId]);
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours < 12 ? 'AM' : 'PM';
    return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
  }

  formatSlot(slot: TurfSlot): string {
    return `${this.formatTime(slot.startTime)} - ${this.formatTime(slot.endTime)}`;
  }

  get readableDate(): string {
    if (!this.selectedDate) return 'Choose a date';
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${this.selectedDate}T00:00:00Z`));
  }
}
