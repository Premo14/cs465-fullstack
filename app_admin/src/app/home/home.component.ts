import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {NgIf} from "@angular/common";
import {TripListingComponent} from "../trip-listing/trip-listing.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    TripListingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authenticationService: AuthenticationService) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

}
