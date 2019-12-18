import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReclamService } from 'app/services/reclam.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public Editor = ClassicEditor;
  reclamForm: FormGroup;
  id: any;



  constructor(private reclam: ReclamService, private auth: AuthService) { }



  ngOnInit() {
    this.id = this.auth.connectedUser.client;

    this.reclamForm = new FormGroup({

      client: new FormControl(this.id),
      titre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      type: new FormControl("Front", [Validators.required])



    });
  }




  save() {
    this.reclam.register(this.reclamForm.value).subscribe((res: any) => {
      console.log(res);



    });
  }
}
