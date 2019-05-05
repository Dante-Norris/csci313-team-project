
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  implements OnInit {
  constructor ( public afAuth: AngularFireAuth ){}
  
  title = 'Fitness-Application';

  
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

