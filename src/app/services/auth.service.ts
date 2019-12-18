import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: any;
  userId: string;

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
    console.log(this.connectedUser._id)
    this.disconnected().subscribe();
    this.connectedUser = null;
    this.router.navigateByUrl('/login')
    window.location.reload(true);


  }

  register(form) {
    return this.http.post('http://localhost:3000/client/addClient', form);
  }



  registerUser(form) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/users/addUser', form, { headers: header });
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

  getProfile(data) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/profile', { headers: header });
  }

  getAllUser() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getAllUser', { headers: header });

  }

  getTechFront() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUserTechFront', { headers: header });

  }

  getClient() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUserClient', { headers: header });

  }
  getConseiller() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUserConseiller', { headers: header });

  }



  // detailUser(id, role) {
  //   const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   if (role === "admin") {
  //     return this.http.get('http://localhost:3000/users/getUserAdmin/' + id, { headers: header })
  //   }
  //   if (role === "ChefBack") {
  //     return this.http.get('http://localhost:3000/users/getUserChefBack/' + id, { headers: header })
  //   }

  // }


  getAdminById(id) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUserAdmin/' + id, { headers: header })

  }


  getchBackById(id) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUserChefBack/' + id, { headers: header })

  }

  updateUser(id, form) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/users/updateUser/' + id, form, { headers: header })
  }

  upload(file) {
    return this.http.post('http://localhost:3000/client/upload', file);
  }

  getfile(file) {
    return this.http.get('http://localhost:3000/client/file/' + file)
  }

  activate(code, userId) {
    return this.http.get('http://localhost:3000/users/activeAccount/' + code + '/' + userId)
  }

  connected(userId) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/connected/' + userId, { headers: header })
  }


  disconnected() {
    return this.http.get('http://localhost:3000/users/disconnected/' + this.connectedUser._id)
  }



}



