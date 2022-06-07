import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css']
})
export class DeleteFlightComponent implements OnInit {

  products: Observable<Flight[]> | any;

  submitted = false;

  constructor(private flightService: FlightService, 
              private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.products = this.flightService.getProductsList1();
  }

  //onSubmit() {
    //this.submitted = true;
    //this.deleteProduct();    
  //}

  productDetails(id: number){
    this.router.navigate(['details', id]);
  }

  editProduct(id: number) {
    this.router.navigate(['update',id])  // navigate to component from a method
  }
  
  deleteProduct(id: number) {
    this.flightService.deleteFlight(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/deleteflight']).then(() => {
      window.location.reload();
    });
  }

}
