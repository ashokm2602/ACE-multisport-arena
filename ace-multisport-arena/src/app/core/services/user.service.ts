import { Injectable } from '@angular/core';
import { User } from '../../shared/models/arena.models';
// API boundary: GET /api/users and admin-only user management endpoints.
@Injectable({ providedIn: 'root' })
export class UserService { list(): Promise<User[]> { return Promise.reject(new Error('User API is not connected.')); } }
