import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  selectedExercise: ExerciseID;

  onSelect(exercise: ExerciseID): void {
    this.selectedExercise = exercise;
  }

  private exerciseCollection: AngularFirestoreCollection<Exercise>;
  exercises: Observable<ExerciseID[]>;

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
