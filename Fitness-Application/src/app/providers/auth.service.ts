import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }
  loggedStatus: boolean = false;

  

  // Sign up
  signUp(email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(function(firebaseUser) {
      // Success block
      console.log("Register Successful")
    })

    .catch(function(error) {
      // Error block
      var errorCode = error.code;
      var errorMessage = error.message;
      if ( errorCode === 'auth/email-already-in-use') {
        alert('That email is already registered to an account')
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    // Redirect if successful
    if (firebase.auth().currentUser) {
      console.log("i'm here");
      console.log(firebase.auth().currentUser)
      this.redirect('homeLink')
    }

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
      } else if ( errorCode === 'auth/email-already-in-use') {
        alert('That email is already registered to an account')
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    if (firebase.auth().currentUser) {
      console.log("i'm here");
      console.log(firebase.auth().currentUser)
      this.redirect('homeLink')
    }
  }


  logout() {
    console.log(firebase.auth().currentUser)
    firebase.auth().signOut();
    if(!firebase.auth().currentUser) {
      console.log("Sign out failed")
    } else {
      console.log("Sign out successful")
    }
    console.log(firebase.auth().currentUser)
  }


  redirect(location: string) {
    let element: HTMLElement = document.getElementById(location) as HTMLElement;
    element.click();
  }
}
