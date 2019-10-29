import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterUserComponent } from 'app/register-user/register-user.component';
import { DialogueshowComponent } from 'app/dialogueshow/dialogueshow.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tab = [];
  user: any;
  config: any
  index: number;
  tab_details: any;
  dialogValue: any;
  registerForm: any;
  emailExist: boolean;
  roles: string[] = ['admin', 'chefBack', 'cheffront', 'techBack', 'techFront', 'conseiller'];
  filterList = '';
  updateForm: FormGroup;





  constructor(private auth: AuthService, public dialog: MatDialog, ) {

    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      confpassword: new FormControl("", [Validators.required, Validators.minLength(5)]),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phone: new FormControl(),
      role: new FormControl("admin", [Validators.required])
    });
    this.updateForm = new FormGroup({

      email: new FormControl(),
      active: new FormControl()

    });

  }

  ngOnInit() {



    console.log(this.auth.connectedUser.role)
    if (this.auth.connectedUser.role === 'admin') {
      this.auth.getAllUser().subscribe((res: any) => {
        console.log(res.data);

        this.tab = res.data
        console.log(this.tab)




      })
    }
    if (this.auth.connectedUser.role === "chefBack") {
      this.auth.getTechFront().subscribe((res: any) => {
        console.log(res.data);
        this.tab = res.data;
      })
    }

  }

  add() {
    // let dialogRef = this.dialog.open(RegisterUserComponent, {
    //   height: '750px',
    //   width: '950px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result.data);

    // });

  }

  registerUser() {

    this.auth.registerUser(this.registerForm.value).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit()


    });
  }

  showDetails(i, item) {
    const role = item.role
    console.log(role)
    console.log(item)

    console.log(i)
    //this.index = i;

    if (role === 'admin') {
      const id = item.admin;
      console.log(id)

      this.auth.getAdminById(id).subscribe(res => {
        console.log(res);
        this.tab_details = res;

      })
    }

    if (role === 'chefBack') {
      const id = item.chefBack;
      console.log(id)

      this.auth.getchBackById(id).subscribe((res: any) => {
        console.log(res);

        this.tab_details = res;

      })
    }

    // if (this.tab[i].role === 'chefFront') {
    //   const id = this.tab[i].chefFront;
    //   console.log(id)
    //   this.auth.detailUser(id, this.tab[i].role).subscribe(res => {
    //     console.log(res);

    //     this.tab_details = res;
    //     console.log(this.tab_details)
    //   })
    // }


  }



  update(item) {
    this.updateForm.controls['email'].setValue(item.email)

    console.log(item)
  }



  pageChanged(event) {
    this.config.currentPage = event;
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
}

