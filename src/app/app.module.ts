import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule
} from "@angular/material";


import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';




import { TechniqueComponent } from './technique/technique.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './plateforme/list/list.component';
import { PlateformeComponent } from './plateforme/plateforme.component';

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

    RouterModule,
    AppRoutingModule,

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

    PlateformeComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
