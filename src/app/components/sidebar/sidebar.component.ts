import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: string;

}
export const ADMINROUTES: RouteInfo[] = [
  { path: '/plateforme/list', title: 'LISTE PERSONNEL', icon: 'supervisor_account', class: '', role: '' },
  { path: '/plateforme/reclamation', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },
  { path: '/table-list', title: 'CLIENTS', icon: 'person', class: '', role: '' },
  { path: '/table-list', title: 'CONSEILLERS', icon: 'person', class: '', role: '' },
];

export const CHBACKROUTES: RouteInfo[] = [
  { path: '/plateforme/list', title: 'LISTE TECHNICIEN ', icon: 'supervisor_account', class: '', role: '' },
  { path: '/user-profile', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },

];
export const CLIENT: RouteInfo[] = [
  { path: '/plateforme/client', title: 'ADD RECLAMATION ', icon: 'supervisor_account', class: '', role: '' },
  { path: '/plateforme/chat', title: 'CHAT ', icon: 'chat', class: '', role: '' }

];

export const CONSEILLER: RouteInfo[] = [
  { path: '/plateforme/list', title: 'LISTE CLIENTS ', icon: 'supervisor_account', class: '', role: '' },
  { path: '/plateforme/chat', title: 'CHAT ', icon: 'chat', class: '', role: '' }

];










// { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
// { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
// { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
// { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
// { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },

// export const ROUTES: RouteInfo[] = [
//   { path: '/plateforme/list', title: 'LISTE PERSONNEL', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/user-profile', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/table-list', title: 'CLIENTS', icon: 'person', class: '', role: '' },
//   { path: '/table-list', title: 'CONSEILLERS', icon: 'person', class: '', role: '' },

//   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];
// export const ROUTES: RouteInfo[] = [
//   { path: '/plateforme/list', title: 'LISTE PERSONNEL', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/user-profile', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/table-list', title: 'CLIENTS', icon: 'person', class: '', role: '' },
//   { path: '/table-list', title: 'CONSEILLERS', icon: 'person', class: '', role: '' },

//   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];
// export const ROUTES: RouteInfo[] = [
//   { path: '/plateforme/list', title: 'LISTE PERSONNEL', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/user-profile', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/table-list', title: 'CLIENTS', icon: 'person', class: '', role: '' },
//   { path: '/table-list', title: 'CONSEILLERS', icon: 'person', class: '', role: '' },

//   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];
// export const ROUTES: RouteInfo[] = [
//   { path: '/plateforme/list', title: 'LISTE PERSONNEL', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/user-profile', title: 'RECLAMMATIONS ', icon: 'supervisor_account', class: '', role: '' },
//   { path: '/table-list', title: 'CLIENTS', icon: 'person', class: '', role: '' },
//   { path: '/table-list', title: 'CONSEILLERS', icon: 'person', class: '', role: '' },

//   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  role: any;
  user: any;
  username: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.connectedUser.role === 'admin') {
      this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
      console.log(this.menuItems)
    } else if (this.auth.connectedUser.role === 'chefBack') {
      this.menuItems = CHBACKROUTES.filter(menuItem => menuItem);
      console.log(this.menuItems)
    } else if (this.auth.connectedUser.role === 'client') {
      this.menuItems = CLIENT.filter(menuItem => menuItem);
      console.log(this.menuItems)
    } else if (this.auth.connectedUser.role === 'conseiller') {
      this.menuItems = CONSEILLER.filter(menuItem => menuItem);
      console.log(this.menuItems)
    }



  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.auth.logout();
  }

}
