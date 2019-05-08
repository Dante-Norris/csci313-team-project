import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public data: AngularFirestore

  displayName = firebase.auth().currentUser.displayName;

  public name: string;
  public height: string;
  public weight: string;
  public age: string;



  items: Observable<any[]>;
  constructor(db : AngularFirestore) {
    this.data = db;
    this.items = db.collection('users').valueChanges();
  }
  

  onClick() {
    const f = (<HTMLSelectElement> document.getElementById("heightSelectFeet")); // Feet select object
    const i = (<HTMLSelectElement> document.getElementById("heightSelectInches"));  // Inches select object

    const height = f.options[f.selectedIndex].value + " " + i.options[i.selectedIndex].value // Combines selected value of 'f' and 'i'
    const age = (<HTMLInputElement> document.getElementById("age")).value
    const weight = (<HTMLInputElement> document.getElementById("weight")).value
    const name = firebase.auth().currentUser.displayName

    this.data.collection('users').doc(firebase.auth().currentUser.uid).set({
      Name: name,
      Age: age,
      Weight: weight,
      Height: height,

    }).then(function() {
      console.log("Document written")
    }).catch(function(error) {
      console.log("error message: " + error.message)
    })
  };

  ngOnInit() {
  }

}
