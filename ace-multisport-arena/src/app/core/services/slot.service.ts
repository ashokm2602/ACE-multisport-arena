import { Injectable } from '@angular/core';
import { Slot, SlotStatus } from '../../shared/models/arena.models';
// API boundary: GET /api/turfs/{id}/slots; POST /api/admin/slots/block and /unblock.
@Injectable({ providedIn: 'root' })
export class SlotService {
  readonly selectableStatuses: SlotStatus[] = ['AVAILABLE'];
  canSelect(slot: Slot): boolean { return this.selectableStatuses.includes(slot.status); }
}
