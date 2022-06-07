import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  errorMessage = 'Invalid Credentials';
  successMessage: string | any;
  loginSuccess = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    let user={
      "email":this.username,
      "password":this.password
    }
    this.authenticationService.login(user).subscribe((response) => {
      console.log(response);
      if(response)
      {
        this.router.navigate(['']);
        sessionStorage.setItem('username', this.username)
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
      }
      else{
        this.invalidLogin = true
      }

      //if(this.loginSuccess)
      //{

      //}
    });
 
    this.loginSuccess = false;
  }

}
