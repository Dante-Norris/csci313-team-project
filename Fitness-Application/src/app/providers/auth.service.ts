import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { defineBase } from '@angular/core/src/render3';
import { SWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core/src/metadata/ng_module';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }

  public loggedStatus: boolean = false
  public db: AngularFirestore
 

  // Sign up
  private signUp2() {

    this.db.collection('users').doc(firebase.auth().currentUser.uid).set({
      Name: firebase.auth().currentUser.displayName
    }).then(function() {
      console.log("User info written");
    }).catch(function(error) {
      var errorMessage = error.message
      console.error(errorMessage)
    })
  }


  signUp(email: string, password: string, name: string ) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        // Success block
        console.log("Register Successful")
        firebase.auth().currentUser.updateProfile({
          displayName: name
        })
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
      })

      if (firebase.auth().currentUser) {
          console.log(firebase.auth().currentUser)
          console.log("i'm here")
          this.redirect('homeLink')
          
      }; 

  }


  // Log in
  logIn(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      // // Success block
      // console.log("Sign in successful")
      console.log(firebase.auth().currentUser)
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
    })

    if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser)
        console.log("I'm here")
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
    element.click()
  }
}
