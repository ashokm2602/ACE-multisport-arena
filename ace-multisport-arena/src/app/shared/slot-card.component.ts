import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Slot, SlotStatus } from './models/arena.models';

@Component({
  selector: 'app-slot-card', standalone: true,
  template: `<button type="button" class="slot" [class.selected]="status === 'SELECTED'" [class.booked]="status === 'BOOKED'" [class.blocked]="status === 'BLOCKED'" [class.reserved]="status === 'ADMIN_RESERVED'" [class.pending]="status === 'PAYMENT_PENDING'" [disabled]="status !== 'AVAILABLE' && status !== 'SELECTED'" [attr.aria-pressed]="status === 'SELECTED'" [attr.aria-label]="slot.startTime + ', ' + label(status)" (click)="picked.emit(slot)"><span>{{ slot.startTime }}</span><small>{{ label(status) }}</small></button>`,
  styles: [`.slot{width:100%;min-height:68px;border:1px solid #394246;border-radius:7px;background:#1b2023;color:#ecf0ed;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;cursor:pointer}.slot:hover:not(:disabled){border-color:#35dc82}.slot.selected{background:#17412c;border-color:#35dc82}.slot:disabled{opacity:.53;cursor:not-allowed}.slot.booked{background:#302326}.slot.blocked{background:#292d30}.slot.reserved{background:#322b20}.slot.pending{background:#2d2935}.slot span{font-size:.82rem;font-weight:700}.slot small{font-size:.67rem;color:#b3beb8}@media(max-width:650px){.slot{min-height:64px}}`]
})
export class SlotCardComponent {
  @Input({ required: true }) slot!: Slot;
  @Input() status: SlotStatus = 'AVAILABLE';
  @Output() picked = new EventEmitter<Slot>();
  label(status: SlotStatus): string { return status === 'SELECTED' ? 'Selected' : status === 'ADMIN_RESERVED' ? 'Reserved' : status === 'PAYMENT_PENDING' ? 'Payment pending' : status[0] + status.slice(1).toLowerCase(); }
}
