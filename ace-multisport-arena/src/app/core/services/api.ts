import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Shared HTTP wrapper for requests to the ASP.NET backend. */
@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly baseUrl = 'https://localhost:7243/api';

  constructor(private readonly http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`);
  }

  post<TResponse, TBody>(path: string, body: TBody): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.baseUrl}/${path}`, body);
  }

  put<TResponse, TBody>(path: string, body: TBody): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.baseUrl}/${path}`, body);
  }

  delete<TResponse = void>(path: string): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.baseUrl}/${path}`);
  }
}
