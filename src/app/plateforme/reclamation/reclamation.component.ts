import { Component, OnInit } from '@angular/core';
import { ReclamService } from 'app/services/reclam.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss', './reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  tab: any;
  description: any;

  constructor(private reclam: ReclamService, private auth: AuthService) { }

  ngOnInit() {

    if (this.auth.connectedUser.role === 'admin') {
      this.reclam.getAllReclam().subscribe((res: any) => {
        console.log(res.data);

        this.tab = res.data
        console.log(this.tab)

      })
    }
  }

  showDetails(item) {
    this.description = item.description
    console.log(this.description)

  }

}
