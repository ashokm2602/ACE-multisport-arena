import { Injectable } from '@angular/core';
import { Booking, Notification } from '../../shared/models/arena.models';
// Backend owns provider credentials and delivery: POST /api/notifications/booking-confirmation.
@Injectable({ providedIn: 'root' })
export class NotificationService {
  sendBookingConfirmation(_booking: Booking): Promise<Notification> { return Promise.reject(new Error('Notification API is not connected.')); }
  sendAdminBookingNotification(_booking: Booking): Promise<Notification> { return Promise.reject(new Error('Notification API is not connected.')); }
}
