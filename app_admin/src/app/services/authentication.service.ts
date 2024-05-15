import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
import {Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    console.log("token: " + token)
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Observable<void> {
    return this.tripDataService.login(user).pipe(
      switchMap((authResp: AuthResponse) => {
        console.log("token: " + authResp.token)
        this.saveToken(authResp.token);
        return new Observable<void>(observer => {
          observer.next(); // Complete the observable
        });
      })
    );
  }

  public register(user: User): Observable<void> {
    return this.tripDataService.register(user).pipe(
      switchMap((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        return new Observable<void>(observer => {
          observer.next(); // Complete the observable
        });
      })
    );
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }
  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } =
        JSON.parse(atob(token.split('.')[1] ?? ''));
      return { email, name } as User;
    } else {
      return null;
    }
  }
}
