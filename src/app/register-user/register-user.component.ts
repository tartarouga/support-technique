import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { ErrorStateMatcher } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListComponent } from '../plateforme/list/list.component';







@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})






export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  emailExist: any = false;
  roles: string[] = ['admin', 'chefBack', 'cheffront', 'techBack', 'techFront', 'conseiller'];
  tab: any;


  constructor(private auth: AuthService,

    public dialogRef: MatDialogRef<RegisterUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any


  ) {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      confpassword: new FormControl("", [Validators.required, Validators.minLength(5)]),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phone: new FormControl(),
      role: new FormControl("admin", [Validators.required])
    }), { Validators: passwordMatchValidator }


  }

  ngOnInit() {

  }


  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerForm.get('confpassword').touched && this.registerForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerForm.get('password').touched && this.registerForm.invalid;
      return controlInvalid || formInvalid;
    }
  }




  registerUser() {

    this.auth.registerUser(this.registerForm.value).subscribe((res: any) => {
      console.log(res);



    });
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


  getErrorMessage(controlName: string) {
    if (this.registerForm.controls[controlName].hasError('minlength')) {
      return 'Must be at least 5 characters'
    }

    return 'Passwords must match'
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.tab });
  }

}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confpassword').value
  return password === confirm ? null : { mismatch: true };
}

