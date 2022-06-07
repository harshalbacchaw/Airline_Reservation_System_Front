import { Component, OnInit } from '@angular/core';

import { Flight } from '../flight';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { AuthenticationService } from '../authentication.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { FlightDetails } from '../flight-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*products: Observable<Flight[]> | any;

  registerForm: FormGroup | any;
  product: Flight = new Flight();
  submitted = false;

  City: any = ['Bangalore','Chennai', 'Delhi', 'Kolkatta','Mumbai', ]

  constructor(private flightService: FlightService,
              private router: Router) { }

  ngOnInit(): void {
  }
  

  get f() { return this.registerForm.controls; }

  newProduct(): void {
    this.submitted = false;
    //this.product= new Flight();
  }
 
  save() {
    alert(this.product);
    this.flightService.newFlight(this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product= new Flight();
    this.gotoList();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
    this.gotoList();    
  }
 
  gotoList() {
    this.router.navigate(['/fdetails']).then(() => {
      window.location.reload();
    });
  }*/



  registerForm: FormGroup | any;
  submitted = false;
 
  City: any = ['Bangalore','Chennai', 'Delhi', 'Kolkatta','Mumbai', ]
 
  flight: FlightDetails = new FlightDetails();
  
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private fService: FlightService,
              private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      source: ['',[ Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      destination: ['',[ Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date: ['', [Validators.required]],
      phoneNo:  ['', [Validators.required]],
      street:  ['', [Validators.required]],
      city:  ['', [Validators.required]],
      passengers:  ['', [Validators.required]],});
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 
  changeCity(e: | any) {
    this.registerForm.get('city').setValue(e.target.value, {
     onlySelf: true
    })
  }

  DealerAddress(): void {
    this.submitted = false;
    this.flight= new FlightDetails();
  }

  
  onSubmit() {

    this.submitted = true;
    this.flight=this.registerForm.value;
    // stop the process here if form is invalid
    //if (this.registerForm.invalid) {
      //  return;
    //}
    if(this.authenticationService.isUserLoggedIn())
    {
    this.search();
    }
    else{
      alert("You are not Logged in please Login");
      this.router.navigate(['/login']);
    }
  }

  search() {
    alert(this.flight.source+" "+this.flight.destination);
    /*this.authenticationService.saveDealer(this.flight)
    .subscribe(data => console.log(data), error => console.log(error));
    this.flight= new FlightDetails();*/

    this.fService.source = this.flight.source;
    this.fService.destination = this.flight.destination;
    this.authenticationService.source1 = this.flight.source;
    this.authenticationService.destination1 = this.flight.destination;
    this.fService.date = this.flight.date;
    this.fService.passengers = this.flight.passengers;

    this.gotoList();
  }

  gotoList() {

    this.router.navigate(['/fdetails']);

    /*if(this.authenticationService.isUserLoggedIn()){
    this.router.navigate(['/fdetails']);
    }
    else{
      this.router.navigate(['/login']);
    }*/
  }

}
