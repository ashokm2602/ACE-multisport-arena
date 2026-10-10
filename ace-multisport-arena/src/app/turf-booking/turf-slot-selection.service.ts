import { Injectable } from '@angular/core';

export interface TurfSlotRange {
  date: string;
  startHour: number;
  endHour: number;
}

export type SlotSelectionResult =
  | { type: 'selected' | 'extended' | 'shrunk'; range: TurfSlotRange }
  | { type: 'unavailable' | 'different-date' | 'non-consecutive' | 'interior' | 'last-slot' };

/** Owns the single continuous one-hour range selected for a turf booking. */
@Injectable()
export class TurfSlotSelectionService {
  private currentRange: TurfSlotRange | null = null;

  get range(): TurfSlotRange | null { return this.currentRange ? { ...this.currentRange } : null; }

  get hours(): number[] {
    if (!this.currentRange) return [];
    return Array.from(
      { length: this.currentRange.endHour - this.currentRange.startHour },
      (_, index) => this.currentRange!.startHour + index
    );
  }

  toggle(date: string, hour: number, available: boolean): SlotSelectionResult {
    if (!available) return { type: 'unavailable' };
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) return { type: 'non-consecutive' };

    if (!this.currentRange) {
      this.currentRange = { date, startHour: hour, endHour: hour + 1 };
      return { type: 'selected', range: this.range! };
    }

    const range = this.currentRange;
    if (range.date !== date) return { type: 'different-date' };

    if (hour === range.startHour - 1) {
      this.currentRange = { ...range, startHour: hour };
      return { type: 'extended', range: this.range! };
    }
    if (hour === range.endHour) {
      this.currentRange = { ...range, endHour: hour + 1 };
      return { type: 'extended', range: this.range! };
    }

    if (hour === range.startHour || hour === range.endHour - 1) {
      if (range.endHour - range.startHour === 1) return { type: 'last-slot' };
      this.currentRange = hour === range.startHour
        ? { ...range, startHour: range.startHour + 1 }
        : { ...range, endHour: range.endHour - 1 };
      return { type: 'shrunk', range: this.range! };
    }

    if (hour >= range.startHour && hour < range.endHour) return { type: 'interior' };
    return { type: 'non-consecutive' };
  }

  clear(): boolean {
    const hadSelection = this.currentRange !== null;
    this.currentRange = null;
    return hadSelection;
  }
}
