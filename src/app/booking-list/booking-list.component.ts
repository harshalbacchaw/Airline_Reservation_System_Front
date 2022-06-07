import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  registerForm: FormGroup | any;
  
  user: User = new User();
  submitted = false;
  
  constructor(private formBuilder:FormBuilder ,private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['',[ Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      passportNo:  ['', [Validators.required]],
      passengerNo:  ['', [Validators.required]],});
  }

  /*newBooking(): void {
    this.submitted = false;
    this.user = new User();
  }*/

  save() {
    /*this.bookingService.createBooking(this.user)
    .subscribe(data => console.log(data),
    error => console.log(error));*/

    this.flightService.name = this.user.name;
    this.flightService.passportNo = this.user.passportNo;
    this.flightService.passengers = this.user.passengerNo;
    //alert(this.flightService.name); 

    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/bookingdetails']);
  }

}
