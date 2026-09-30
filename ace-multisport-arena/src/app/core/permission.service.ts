import { Injectable, computed, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Permission, Role } from '../shared/models/arena.models';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  CUSTOMER: ['CREATE_BOOKING'],
  STAFF: ['VIEW_BOOKINGS', 'CREATE_BOOKING', 'CANCEL_BOOKING', 'RESERVE_SLOT'],
  ADMIN: ['VIEW_BOOKINGS', 'CREATE_BOOKING', 'CANCEL_BOOKING', 'BLOCK_SLOT', 'RESERVE_SLOT', 'EDIT_PRICING', 'MANAGE_USERS']
};

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly auth = inject(AuthService);
  readonly permissions = computed(() => ROLE_PERMISSIONS[this.auth.currentUser()?.role ?? 'CUSTOMER']);
  can(permission: Permission): boolean { return !!this.auth.currentUser() && this.permissions().includes(permission); }
}
