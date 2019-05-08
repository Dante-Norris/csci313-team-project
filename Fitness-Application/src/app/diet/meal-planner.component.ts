import { Component, OnInit } from '@angular/core';
import { MEALS } from '../mock-meals';
import { Meal } from '../meal';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  meals = MEALS;
  selectedMeal: Meal;
  onSelect(meal: Meal): void {
    this.selectedMeal = meal;
  }
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('diet').valueChanges();
  }

  ngOnInit() {
  }

}
