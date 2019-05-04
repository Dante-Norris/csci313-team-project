import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './providers/auth.service'
import { SWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core/src/metadata/ng_module';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  implements OnInit {
  title = 'Fitness-Application';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAE_I6MIbYII48cyHiplYTu8bGYgpptiOo",
      authDomain: "csci-313-team-project.firebaseapp.com",
    });
  }
  
}

