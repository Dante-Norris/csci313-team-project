import { Component, OnInit } from '@angular/core';
import { EXERCISES } from '../mock-exercises';
import { Exercise } from '../exercise';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises = EXERCISES;
  selectedExercise: Exercise;
  onSelect(exercise: Exercise): void {
    this.selectedExercise = exercise;
  }
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('exercises').valueChanges();
  }
  ngOnInit() {
  }

}
