import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email , password).catch(
      error => console.log('Error')
    );

  }
  
}
