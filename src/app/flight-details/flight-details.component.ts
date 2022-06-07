import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Flight } from '../flight';
import { FlightDetails } from '../flight-details';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  flights:Observable<Flight[]> | any;

  flight : FlightDetails = new FlightDetails();

  min='min';
  newdate = '';
  flightId = 0;

  constructor(private flightService: FlightService, 
              private router:Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.flight = this.route.snapshot.params['flight'];

    this.reloadData();
  }

  reloadData() {

    this.newdate = this.flightService.date;
    this.flights = this.flightService.getFlight(this.flightService.source,this.flightService.destination); 
    //alert(this.flights.fNumber);
  }

  FlightDetails(fNumber: number){
    //alert(id);
    this.flightId = fNumber;
    this.flightService.flightId = fNumber;
    this.router.navigate(['selectflight', fNumber]);
  }

  editFlight(id: number) {
    this.router.navigate(['update',id])  // navigate to component from a method
  }

  deleteFlight(id: number) {
    this.flightService.deleteFlight(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
