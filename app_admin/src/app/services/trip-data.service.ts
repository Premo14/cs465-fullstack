import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  url = 'http://localhost:3000';

  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/api/trips`);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}api/trips/${code}`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    const headers = this.getAuthHeaders()
    return this.http.post<Trip>(`${this.url}/api/trips`, formData, {headers});
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const headers = this.getAuthHeaders()
    return this.http.put<Trip>(`${this.url}/api/trips/${formData.code}`, formData, {headers});
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.url}/api/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    console.error('An error occurred:', error);
    return Promise.reject(error.error || 'Server error');
  }
}
