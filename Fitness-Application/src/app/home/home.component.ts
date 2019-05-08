import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service'
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items : Observable<any[]>

  flag : number = 0

  constructor(private authService: AuthService, db: AngularFirestore) { 
      
      db.collection('users').doc(firebase.auth().currentUser.uid).update({
      Name: firebase.auth().currentUser.displayName,
    })
  }

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
