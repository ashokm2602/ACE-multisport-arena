import { Injectable } from '@angular/core';
import { Booking, Slot } from '../../shared/models/arena.models';
// API boundary: GET /api/turfs, GET /api/turfs/{id}/slots, POST /api/bookings,
// GET /api/bookings/mine, GET /api/admin/bookings, POST /api/admin/bookings/reserve.
@Injectable({ providedIn: 'root' })
export class BookingService {
  createBooking(_slots: Slot[]): Promise<Booking> { return Promise.reject(new Error('Booking API is not connected.')); }
  createAdminReservation(_details: Pick<Booking, 'customerName' | 'phone' | 'date' | 'notes'>, _slots: Slot[]): Promise<Booking> { return Promise.reject(new Error('Admin booking API is not connected.')); }
  getMyBookings(): Promise<Booking[]> { return Promise.reject(new Error('Booking API is not connected.')); }
  getAdminBookings(): Promise<Booking[]> { return Promise.reject(new Error('Admin booking API is not connected.')); }
}
