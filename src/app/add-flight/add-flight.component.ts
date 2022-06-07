import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  registerForm: FormGroup | any;
  flight: Flight = new Flight();
  submitted = false;

  City: any = ['Bangalore','Chennai', 'Delhi', 'Kolkatta','Mumbai', ]

  constructor(private flightService: FlightService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  newProduct(): void {
    this.submitted = false;
    this.flight= new Flight();
  }
 
  save() {
    this.flightService.newFlight(this.flight)
      .subscribe(data => console.log(data), error => console.log(error));
    this.flight= new Flight();
    this.gotoList();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();    
  }
 
  gotoList() {
    this.router.navigate(['/addflight']).then(() => {
      window.location.reload();
    });
  }

  gotoList1() {
    this.router.navigate(['/deleteflight']).then(() => {
      window.location.reload();
    });
  }

}
