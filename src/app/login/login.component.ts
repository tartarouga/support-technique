import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {

  }

  loginUser() {
    this.auth.loginUser(this.loginForm.value).subscribe(res => {

      this.auth.saveToken(res.success);
      this.auth.connected(this.auth.connectedUser._id).subscribe(data => {
        console.log(data)
        console.log(res)
      });

      if (this.auth.connectedUser.status === "suspended") {
        alert('your account is suspended,please contact your admin')
        this.auth.logout();
      } else

        if (this.auth.connectedUser.role === 'client') {
          this.router.navigateByUrl('plateforme/client');
        } else
          //   
          // }
          this.router.navigateByUrl('/plateforme');
    })
  }
}
