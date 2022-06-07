import { Component, OnInit } from '@angular/core';

import { Flight } from '../flight';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {

  id: number = 0;
  flight: Flight | any;
  submitted = false;
  products: Observable<Flight[]> | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService) { }

  ngOnInit(): void {

    this.flight = new Flight();
   
    this.id = this.route.snapshot.params['id'];
    
    this.flightService.getFlightById(this.id)
      .subscribe(data => {
        console.log(data)
        this.flight = data;
      }, error => console.log(error));
  }

  updateFlight() {
    this.flightService.updateFlight(this.id, this.flight)
      .subscribe(data => console.log(data), error => console.log(error));
    this.flight = new Flight();
    //this.reloadData();
    this.gotoList();
  }
 
  onSubmit() {
    this.updateFlight();    
  }
  reloadData() {
    //this.products = this.flightService.getProductsList();
  }
  gotoList() {
    this.router.navigate(['/addflight']).then(() => {
      window.location.reload();
    });
  }

}
