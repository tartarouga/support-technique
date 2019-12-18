import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-dialogueshow',
  templateUrl: './dialogueshow.component.html',
  styleUrls: ['./dialogueshow.component.scss']
})
export class DialogueshowComponent implements OnInit {
  code: any;
  userId: any;

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.code = this.route.snapshot.params['code']
    this.userId = this.route.snapshot.params['userId']
    console.log(this.userId)
    console.log(this.code)
    this.auth.activate(this.code, this.userId).subscribe(data => {
      console.log(data)
    })
  }

}
