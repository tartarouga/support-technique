import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Socket } from 'ngx-socket-io';
import { ChatService } from 'app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', './chat.component.css']
})
export class ChatComponent implements OnInit {
  messageForm: any;
  listeUsers = [];
  choosen: any;
  conversation: any;
  listeMessages: any;

  constructor(private auth: AuthService, private chat: ChatService, private socket: Socket) { }

  ngOnInit() {

    this.socket.on('connection', function (data) {
      console.log(data);
    })

    console.log(this.auth.connectedUser._id)
    this.messageForm = new FormGroup({
      content: new FormControl(''),
      user: new FormControl(this.auth.connectedUser._id),
    });

    if (this.auth.connectedUser.role === "conseiller") {
      this.auth.getClient().subscribe((res: any) => {
        this.listeUsers = res.data;


      });






    } else if (this.auth.connectedUser.role === "client") {
      this.auth.getConseiller().subscribe((res: any) => {
        this.listeUsers = res.data;


      });
    }


    this.socket.on('newMessageSended', () => {
      this.clickUser(this.choosen);
      console.log('send');
    });




  }

  clickUser(id) {
    this.choosen = id;
    this.chat.getPrivateMessage(id, this.auth.connectedUser._id).subscribe((res: any) => {
      console.log(res);
      this.conversation = res._id;
      console.log(this.conversation)
      this.listeMessages = res.messages;
      console.log(this.listeMessages)
    });

  }

  sendMessage() {
    console.log('clicked');
    this.chat.sendMessage(this.messageForm.value, this.conversation).subscribe();
  }

}
