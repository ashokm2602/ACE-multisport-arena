import { Injectable } from '@angular/core';
import { Payment } from '../../shared/models/arena.models';
// Backend only: POST /api/payments/create-order, POST /api/payments/verify, GET /api/payments/{id}.
// The backend verifies Razorpay signatures and owns the final payment state.
@Injectable({ providedIn: 'root' })
export class PaymentService {
  createPaymentOrder(_bookingId: string): Promise<Payment> { return Promise.reject(new Error('Payment API is not connected.')); }
  verifyPayment(_payload: unknown): Promise<Payment> { return Promise.reject(new Error('Payment verification must be performed by the backend.')); }
  getPaymentStatus(_paymentId: string): Promise<Payment> { return Promise.reject(new Error('Payment API is not connected.')); }
}
