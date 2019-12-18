import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  MatInputModule,
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTableModule
} from "@angular/material";


import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';




import { TechniqueComponent } from './technique/technique.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './plateforme/list/list.component';
import { PlateformeComponent } from './plateforme/plateforme.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DialogueshowComponent } from './dialogueshow/dialogueshow.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './filter.pipe';
import { ClientComponent } from './plateforme/client/client.component';
import { ReclamationComponent } from './plateforme/reclamation/reclamation.component';
import { ChatComponent } from './plateforme/chat/chat.component';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatSnackBarModule,
    CKEditorModule,
    SocketIoModule.forRoot(config)

  ],
  declarations: [
    AppComponent,

    TechniqueComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

    HeaderComponent,

    ListComponent,

    PlateformeComponent,

    RegisterUserComponent,

    DialogueshowComponent,

    FilterPipe,

    ClientComponent,

    ReclamationComponent,
    ChatComponent



  ],
  entryComponents: [
    RegisterUserComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
