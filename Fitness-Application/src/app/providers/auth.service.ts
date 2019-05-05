import { Injectable } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { CanActivate } from '@angular/router';



@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }
  private static LoggedIn: boolean = false;
  public static getLoggedStatus() {
    return this.LoggedIn;
  }


  

  // Sign in 
  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      // Success block
      console.log("Register Successful")
    })
    .catch(function(error) {
      // Error block
      var errorCode = error.code;
      var errorMesage = error.message;
      alert(error.Message);
      console.log(error);
    });
  }


  // Log in
  logIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      // Success block
      console.log("Sign in successful")
    })
    .catch(function(error) {
      // Error block
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }


  logout() {

  }

  redirect(location: string) {
    let element: HTMLElement = document.getElementById(location) as HTMLElement;
    element.click();
  }
}
