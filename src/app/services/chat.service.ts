import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
//import { Observable } from 'rxjs/Observable';






@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;


  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');

  }

  getPrivateMessage(idUser1, idUser2) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/chat/getPrivateMessage/' + idUser1 + '/' + idUser2, { headers: header });
  }
  sendMessage(message, idChat) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/chat/sendMessage/' + idChat, message, { headers: header });
  }




}
