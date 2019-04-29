import { Component, OnInit } from '@angular/core';
import { MEALS } from '../mock-meals';
import { Meal } from '../meal';

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

  constructor() { }

  ngOnInit() {
  }

}
