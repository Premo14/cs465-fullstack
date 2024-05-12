import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {Trip} from "../models/trip";

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any

  constructor(private router: Router) {}

  ngOnInit() {

  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('code')
    localStorage.setItem('code', trip.code)
    this.router.navigate(['edit-trip'])
  }
}
