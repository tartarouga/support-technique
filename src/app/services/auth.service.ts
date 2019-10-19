import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: any;

  constructor(private http: HttpClient, private router: Router) {
    this.connectedUser = this.getConnectedUser();
  }

  loginUser(form) {
    return this.http.post<any>('http://localhost:3000/auth/login', form);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.connectedUser = this.getConnectedUser();
    console.log(this.connectedUser)
  }
  getConnectedUser() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return jwt_decode(token).data;
    }
  }

  logout() {
    localStorage.clear();
    this.connectedUser = null;
    this.router.navigateByUrl('/login');
    window.location.reload(true);
  }

  register(form) {
    return this.http.post('http://localhost:3000/client/addClient', form);
  }

  islogged() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      this.connectedUser = {}
      return false;
    }
  }

  verifEmail(form) {
    return this.http.post('http://localhost:3000/users/findemail', form);

  }

  getProfile() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/profile', { headers: header });
  }

}
