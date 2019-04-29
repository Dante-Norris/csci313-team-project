import { Component, OnInit } from '@angular/core';
import { EXERCISES } from '../mock-exercises';
import { Exercise } from '../exercise';

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
  constructor() { }

  ngOnInit() {
  }

}
