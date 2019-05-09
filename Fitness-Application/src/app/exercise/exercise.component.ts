import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { stringify } from '@angular/compiler/src/util';

export class Exercise {
  name: string;
  description: string;
  intensity: string; 
  type: string;
}

export class ExerciseID extends Exercise{ 
  id: string; 
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

  //Used as temporary collection in constructor
  private exerciseCollection: AngularFirestoreCollection<Exercise>;
  //Displayed as list on page
  exercises: Observable<ExerciseID[]>;

  //Returns collection as Observable<ExerciseID[]> which includes the document ID
  constructor(db: AngularFirestore) {
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
