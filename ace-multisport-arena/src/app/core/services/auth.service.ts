import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../shared/models/arena.models';

// Backend contract: POST /api/auth/login, POST /api/auth/register, POST /api/auth/logout, GET /api/auth/me.
// No credentials or role claims are persisted by this frontend scaffold.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user = signal<User | null>(null);
  readonly currentUser = this.user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);
  login(_email: string, _password: string): Promise<User> { return Promise.reject(new Error('Authentication API is not connected.')); }
  register(_name: string, _email: string, _password: string): Promise<User> { return Promise.reject(new Error('Registration API is not connected.')); }
  logout(): void { this.user.set(null); }
  /** UI preview only; production identity must be established by the backend. */
  setPreviewUser(user: User | null): void { this.user.set(user); }
}
