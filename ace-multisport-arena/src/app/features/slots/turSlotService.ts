import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../core/services/api';

/** JSON shape returned by the ASP.NET TurfSlot endpoints. */
export interface TurfSlot {
  id: number;
  slotDate: string;
  startTime: string;
  endTime: string;
  price: number;
  isAvailable: boolean;
  createdAt: string;
}

/** Turf slot feature operations mapped to TurfSlotController routes. */
@Injectable({
  providedIn: 'root',
})
export class TurfSlotService {
  private readonly route = 'TurfSlot/turfSlot';

  constructor(private readonly api: Api) {}

  getAll(): Observable<TurfSlot[]> {
    return this.api.get<TurfSlot[]>(`${this.route}/GetAll`);
  }

  getById(id: number): Observable<TurfSlot> {
    return this.api.get<TurfSlot>(`${this.route}/GetById/${id}`);
  }

  getByDate(date: string): Observable<TurfSlot[]> {
    return this.api.get<TurfSlot[]>(`${this.route}/GetByDate/${encodeURIComponent(date)}`);
  }

  getAvailableByDate(date: string): Observable<TurfSlot[]> {
    return this.api.get<TurfSlot[]>(`${this.route}/GetAvailable/${encodeURIComponent(date)}`);
  }

  getBookedByDate(date: string): Observable<TurfSlot[]> {
    return this.api.get<TurfSlot[]>(`${this.route}/GetBooked/${encodeURIComponent(date)}`);
  }

  /** The backend action binds a DateTime scalar from the JSON request body. */
  create(date: string): Observable<TurfSlot> {
    return this.api.post<TurfSlot, string>(`${this.route}/Create`, date);
  }

  update(id: number, slot: TurfSlot): Observable<TurfSlot> {
    return this.api.put<TurfSlot, TurfSlot>(`${this.route}/Update/${id}`, slot);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.route}/Delete/${id}`);
  }

  createForDate(date: string): Observable<void> {
    return this.api.post<void, null>(`${this.route}/CreateForDate/${encodeURIComponent(date)}`, null);
  }
}
