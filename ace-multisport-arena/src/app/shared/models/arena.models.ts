export type Role = 'CUSTOMER' | 'ADMIN' | 'STAFF';
export type Permission = 'VIEW_BOOKINGS' | 'CREATE_BOOKING' | 'CANCEL_BOOKING' | 'BLOCK_SLOT' | 'RESERVE_SLOT' | 'EDIT_PRICING' | 'MANAGE_USERS';
export type SlotStatus = 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'BLOCKED' | 'ADMIN_RESERVED' | 'PAYMENT_PENDING';
export type BookingStatus = 'PENDING_PAYMENT' | 'CONFIRMED' | 'ADMIN_RESERVED' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'NOT_STARTED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
export interface User { id: string; name: string; email: string; phone?: string; role: Role; }
export interface Sport { id: string; name: string; }
export interface Turf { id: string; name: string; sportId: string; location?: string; }
export interface Slot { id: string; turfId: string; date: string; startTime: string; endTime: string; status: SlotStatus; price: number; }
export interface Booking { id: string; userId?: string; customerName: string; phone?: string; turf: Turf; date: string; slots: Slot[]; durationHours: number; amount: number; status: BookingStatus; paymentStatus: PaymentStatus; notes?: string; }
export interface Payment { id?: string; bookingId: string; amount: number; status: PaymentStatus; }
export interface TurfPricing { turfId: string; weekdayPrice: number; weekendPrice: number; currency: string; rules?: Array<{ dayOfWeek?: number[]; startTime?: string; endTime?: string; price: number; label?: string }>; }
export interface Notification { bookingId: string; recipient: 'CUSTOMER' | 'ADMIN'; channel: 'SMS' | 'WHATSAPP' | 'EMAIL'; }
