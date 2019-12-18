import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { invalid } from '@angular/compiler/src/render3/view/util';









@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})






export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailExist: any = false;

  notsamePass: boolean = false;
  msg: string;
  selectedFile: string | Blob;
  defaultImage = '../../assets/img/avatar_2x.png';
  size = false;
  user: any;




  constructor(private auth: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      confpassword: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phone: new FormControl(),
      avatar: new FormControl("")
    })

    this.registerForm.controls.password.valueChanges
      .subscribe(x => this.registerForm.controls.confpassword.updateValueAndValidity())

  }

  ngOnInit() {

  }






  fileInputChange(event) {
    this.defaultImage = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.defaultImage = event.target.result;
    };
    console.log(event.target.files[0])
    if (event.target.files[0].size >= 5000000) {

      this.size = true;
      console.log(this.size)
      this.registerForm.controls.avatar.setErrors({ 'valid': false });
    } else {
      this.size = false;
      console.log(this.size)

      this.registerForm.controls.avatar.setErrors({ 'valid': true });
      this.registerForm.controls.avatar.setValue(event.target.files[0].name)

    }


  }


  register() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);



    this.auth.upload(formData).subscribe((data: any) => {
      console.log(data)
      this.user = this.registerForm.value;
      this.user.avatar = data.filename;
      this.auth.register(this.user).subscribe((res: any) => {
        console.log(res);

      });


    });


    console.log(this.registerForm.value)
  }

  verifEmail() {
    this.auth.verifEmail(this.registerForm.value).subscribe((res: any) => {
      console.log(res.emailExist)
      if (res.emailExist === true) {
        this.emailExist = true;
        this.registerForm.controls['email'].setErrors({ 'valid': false });


      } else {
        console.log(res.emailExist)
        this.emailExist = false;
        this.registerForm.controls['email'].markAsTouched();
        console.log(this.registerForm.controls['email'].valid)


      }
    })
  }

  verifPassword() {

    const password = this.registerForm.root.get('password')
    console.log(password)
    if (password) {
      const value = password.value
      if (value != this.registerForm.get('confpassword').value) {
        this.notsamePass = true;
        this.registerForm.controls['confpassword'].setErrors({ 'valid': false });

      } else {

        this.notsamePass = false
        this.registerForm.controls['confpassword'].markAsTouched();

      }
    }


  }








}




