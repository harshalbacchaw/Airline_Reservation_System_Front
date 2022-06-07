import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  errorMessage = 'Invalid Credentials';
  successMessage: string | any;
  loginSuccess = false;

  constructor(private router: Router,
              private loginService: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    let admin={
      "email":this.username,
      "password":this.password
    }
    this.loginService.loginAdmin(admin).subscribe((response) => {
      console.log(response);
      if(response)
      {
        this.router.navigate(['/addflight']);
        sessionStorage.setItem('username', this.username)
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
      }
      else{
        this.invalidLogin = true
      }
    });
 
    this.loginSuccess = false;
  }

}
