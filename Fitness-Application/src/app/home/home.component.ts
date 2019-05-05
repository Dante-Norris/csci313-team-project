import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service'
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  getLoggedStatus() {
    if(firebase.auth().currentUser) {
      return true;
    } else {
      return false;
    }
  }
  
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }
  
}
