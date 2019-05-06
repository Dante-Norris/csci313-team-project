
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  implements OnInit {
  constructor ( public afAuth: AngularFireAuth ){}
  
  title = 'Fitness-Application';
  
  public loggedIn : string  = (firebase.auth().currentUser === null) ? "yes" : "no"

  logInCheck() {
    this.loggedIn = firebase.auth().currentUser === null ? "yes" : "no"
    return this.loggedIn === "yes"
  }

  ngOnInit() {
    // only initializes this app once
    if (!firebase.apps.length) { 
        firebase.initializeApp({
          apiKey: "AIzaSyAE_I6MIbYII48cyHiplYTu8bGYgpptiOo",
          authDomain: "csci-313-team-project.firebaseapp.com",
        });
    }
  }
  
}

