import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { UserAddress } from '../user-address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | any;
  submitted = false;
 
  City: any = ['Bangalore','Chennai', 'Delhi', 'Kolkatta','Mumbai', ]
 
  user: UserAddress = new UserAddress();
  
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      fname: ['',[ Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      lname: ['',[ Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', [Validators.required]],
      phoneNo:  ['', [Validators.required]],
      street:  ['', [Validators.required]],
      city:  ['', [Validators.required]],
      pincode:  ['', [Validators.required]],});
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 
  changeCity(e: | any) {
    this.registerForm.get('city').setValue(e.target.value, {
     onlySelf: true
    })
  }

  UserAddress(): void {
    this.submitted = false;
    this.user= new UserAddress();
  }

  
  onSubmit() {
    alert("welcome");
    this.submitted = true;
    this.user=this.registerForm.value;
    // stop the process here if form is invalid
    /*  if (this.registerForm.invalid) {
        return;
    }*/
    alert("hello");
    this.save();
  }

  save() {
    alert("ts");
    this.authenticationService.saveDealer(this.user)
    .subscribe(data => console.log(data), error => console.log(error));
    this.user= new UserAddress();
    // this.address=new Address();

    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/login']);
  }

}
