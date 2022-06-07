import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {

  flightId: number = 0;
  fNumber: number = 0;
  flight: Flight | any;
  newdate1 = '';
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flightService: FlightService) { }

              
  ngOnInit(): void {

    this.flight = new Flight();

    this.newdate1 = this.flightService.date;
    
    this.fNumber = this.route.snapshot.params['fNumber'];  /* Snapshot is used to get the Route Parameters */
    
    /**
     * As a publisher, you create an Observable instance that defines a subscriber function. 
     * This is the function that is executed when a consumer calls the subscribe() method. 
     * The subscriber function defines how to obtain or generate values or messages to be published.
     */
    //alert(this.fNumber);
    this.flightId = this.fNumber;
    this.flightService.flightId = this.fNumber;
    this.flightService.getFlightDetails(this.fNumber)
      .subscribe(data => {
        console.log(data)
        this.flight = data;
      }, error => console.log(error));
  }


}
