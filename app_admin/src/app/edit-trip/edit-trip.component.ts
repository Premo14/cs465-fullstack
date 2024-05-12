import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Trip} from "../models/trip";
import {Router} from "@angular/router";
import {TripDataService} from "../services/trip-data.service";

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup
  trip!: Trip
  submitted = false
  message = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit() {
    let code = localStorage.getItem("code")
    if (!code) {
      alert("Something went wrong, couldn't find where I stashed code!")
      this.router.navigate([""])
      return
    }

    console.log('EditTripComponent::ngOnInit')
    console.log('code:' + code)

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [code, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripDataService.getTrip(code)
      .subscribe({
        next: (value: any) => {
          this.trip = value
          this.editForm.patchValue(value[0])
          if (!value)
          {
            this.message = 'No Trip Retrieved!'
          } else {
            this.message = 'Trip' + code + ' retrieved'
          }
          console.log(this.message)
        },
        error: (error: any) => {
          console.log('Error: ' + error)
        }
      })
  }

  public onSubmit()
  {
    this.submitted = true

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value)
            this.router.navigate([''])
          },
          error: (error: any) => {
            console.log('Error: ' + error)
          }
        })
    }
  }

  get f() { return this.editForm.controls; }
}
