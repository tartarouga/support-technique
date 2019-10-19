import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ListComponent } from './plateforme/list/list.component';
import { PlateformeComponent } from './plateforme/plateforme.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "plateforme", component: PlateformeComponent, canActivate: [AuthGuard], children: [
      { path: "list", component: ListComponent, },
      { path: "", redirectTo: "list", pathMatch: "full" },
    ]
  },
  // {
  //   path: "technique", component: TechniqueComponent, canActivate: [AuthGuard], children: [
  //   ]
  // }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
