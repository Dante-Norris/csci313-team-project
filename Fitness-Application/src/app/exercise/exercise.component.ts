import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export class Exercise {
  Name: string;
  Description: string;
  Intensity: string; 
  Type: string;
}

export class ExerciseID extends Exercise{ 
  id: string; 
}
export class LogExercise extends ExerciseID{
  Date: string;
}

export class LogExerciseID extends LogExercise{
  logId: string;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  //Displayed below list, includes description
  selectedExercise: ExerciseID;

  //Select an exercise from the list
  onSelect(exercise: ExerciseID): void {
    this.selectedExercise = exercise;
  }

  //Sort list by Name, Type, or Intensity
  sort(sortBy: string){
    if(sortBy === 'Name'){
      this.exercises = this.exercises.map( items => items.sort(this.sortByName));
    }
    else if(sortBy === 'Type'){
      this.exercises = this.exercises.map( items => items.sort(this.sortByType));
    }
    else{
      this.exercises = this.exercises.map( items => items.sort(this.sortByIntensity));
    }
  }

  //Sort list alphabetically by name of exercise
  sortByName(a,b) {
    if (a.Name < b.Name)
      return -1;
    if (a.Name > b.Name)
      return 1;
    return 0;
  }

  //Sort list alphabetically by type of exercise
  sortByType(a,b) {
    if (a.Type < b.Type)
      return -1;
    if (a.Type > b.Type)
      return 1;
    return 0;
  }

  //Sort list by intensity of exercise, Low < Medium < High
  sortByIntensity(a,b) {
    var aVal = a.Intensity;
    var bVal = b.Intensity;

    //Default sort would be alphabetical, assigning number allows L<M<H
    if( aVal === 'Low' ){ aVal = 1; }
    else if( aVal === 'Medium' ){ aVal = 2; }
    else{ aVal = 3; }

    if( bVal === 'Low' ){ bVal = 1; }
    else if( bVal === 'Medium' ){ bVal = 2; }
    else{ bVal = 3; }
    
    if (aVal < bVal)
      return -1;
    if (aVal > bVal)
      return 1;
    return 0;
  }

  //Reset this.exercises in case already searched
  resetList(){
    this.selectedExercise = null;
    this.exercises = this.exerciseCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  //Search and display exercises whose Names contain the search term
  searchByName(inputName: string){
    this.resetList();

    //this.exercises now contains only the exercises matching the searched name
    this.exercises = this.exercises.map(items => items.filter(item => item.Name.toLowerCase().includes(inputName.toLowerCase())));
  }

  //Search and display exercises whose Types contain the search term
  searchByType(inputType: string){
    this.resetList();

    //this.exercises now contains only the exercises matching the searched type
    this.exercises = this.exercises.map(items => items.filter(item => item.Type.toLowerCase().includes(inputType.toLowerCase())));
  }

  //Search and display exercises whose Intensities contain the search term
  searchByIntensity(inputIntensity: string){
    this.resetList();

    //this.exercises now contains only the exercises matching the searched type
    this.exercises = this.exercises.map(items => items.filter(item => item.Intensity.toLowerCase().includes(inputIntensity.toLowerCase())));
  }

  //Create exercise, add to database
  addExercise(newName: string, newType: string, newIntensity: string, newDescription: string){
    this.data.collection('exercises').add({
      Name: newName,
      Type: newType,
      Intensity: newIntensity,
      Description: newDescription
    })
  }

  //Add selectedExercise to workout history
  logExercise(){
    this.data.collection('users/' + firebase.auth().currentUser.uid + '/loggedExercises').add({
      id: this.selectedExercise.id,
      Name: this.selectedExercise.Name,
      Type: this.selectedExercise.Type,
      Intensity: this.selectedExercise.Intensity,
      Description: this.selectedExercise.Description,
      Date: new Date().toLocaleDateString()
    })

    this.logResetList();
    
  }

  //Search and display exercises whose Names contain the search term
  logSearchByName(inputName: string){
    this.logResetList();


    //this.loggedExercises now contains only the exercises matching the searched name
    this.loggedExercises = this.loggedExercises.map(items => items.filter(item => item.Name.toLowerCase().includes(inputName.toLowerCase())));
  }

  //Search and display exercises whose Dates match the search term
  logSearchByDate(inputDate: string){
    this.logResetList();


    //this.loggedExercises now contains only the exercises matching the searched date
    this.loggedExercises = this.loggedExercises.map(items => items.filter(function(item: LogExerciseID){
      var convertLocaleDate = new Date(item.Date);
      var convertLocaleDateInput = new Date(inputDate);
      return convertLocaleDate.getTime() === convertLocaleDateInput.getTime();
    }));
  }

  logSort(){
    this.loggedExercises = this.loggedExercises.map( items => items.sort(function(a,b): number{
      var aDate = new Date(a.Date);
      var bDate = new Date(b.Date);
      if (aDate < bDate)
        return -1;
      if (aDate > bDate)  
        return 1;
      return 0;
    }));
  }

  //Reset after search
  logResetList(){
    this.selectedLogExercise =  null;
    this.loggedExercises = this.data.collection<LogExercise>('users/' + firebase.auth().currentUser.uid + '/loggedExercises').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as LogExercise;
        const logId = a.payload.doc.id;
        return { logId, ...data };
      });
    });
  }

  onLogSelect(ex: LogExerciseID){
    this.selectedLogExercise = ex;
  }

  selectedLogExercise: LogExerciseID;

  data: AngularFirestore;
  //Used as temporary collection in constructor
  exerciseCollection: AngularFirestoreCollection<Exercise>;
  //Displayed as list on page
  exercises: Observable<ExerciseID[]>;

  loggedExercises: Observable<LogExerciseID[]>;

  //Returns collection as Observable<ExerciseID[]> which includes the document ID
  constructor(db: AngularFirestore) {
    this.data = db;
    this.exerciseCollection = db.collection<Exercise>('exercises');
    this.exercises = this.exerciseCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ngOnInit() {
  }

}
