import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  source1 = '';
  destination1 = '';

  private baseUrl = 'http://localhost:8086/airindia/api/user';

  constructor(private http:HttpClient) { }

  getDealersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  login(user:any):Observable<any>
  {
    return this.http.post(`http://localhost:8086/airindia/api/users`,user)
  }

  loginAdmin(admin:any):Observable<any>
  {
    return this.http.post(`http://localhost:8086/airindia/api/admin`,admin)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  isAdminLoggedIn() {
    let admin = "harshalbacchaw@gmail.com";
    console.log(!(admin === null))
    return !(admin === null)
  }
 
  logOut() {
    sessionStorage.removeItem('username')
  }

  saveDealer(user: Object): Observable<Object> {
    return this.http.post(`http://localhost:8086/airindia/api/flight`, user);
  }
}
