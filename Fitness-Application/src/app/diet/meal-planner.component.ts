import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export class Meal {
  Name: string;
  Ingredients: string;
  Calories: number;
}

export class MealID extends Meal{
  id: string;
}

export class LogMeal extends MealID{
  Date: string;
}

export class LogMealID extends LogMeal{
  logId: string;
}

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  selectedMeal: MealID;
  onSelect(meal: MealID): void {
    this.selectedMeal = meal;
  }

  data: AngularFirestore;
  meals: Observable<MealID[]>;
  mealCollection: AngularFirestoreCollection<Meal>;

  constructor(db: AngularFirestore) {
    this.data = db;
    this.mealCollection = db.collection<Meal>('diet');
    this.meals = this.mealCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Meal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  //Create meal, add to database
  addFood(newName: string, newIngredients: string, newCalories: number){
    this.data.collection('diet').add({
      Name: newName,
      Ingredients: newIngredients,
      Calories: newCalories
    })
  }

  //Sort list by Name, Ingredients, or Calories
  sort(sortBy: string){
    if(sortBy === 'Name'){
      this.meals = this.meals.map( items => items.sort(this.sortByName));
    }
    else{
      this.meals = this.meals.map( items => items.sort(this.sortByCalories));
    }
  }

  //Sort list alphabetically by Name of meal
  sortByName(a,b) {
    if (a.Name < b.Name)
      return -1;
    if (a.Name > b.Name)
      return 1;
    return 0;
  }

  //Sort list by Calories of meal (ascending)
  sortByCalories(a,b) {
    
    if (a.Calories < b.Calories)
      return -1;
    if (a.Calories > b.Calories)
      return 1;
    return 0;
  }

  //Reset this.meals in case already searched
  resetList(){
    this.selectedMeal = null;

    this.meals = this.mealCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Meal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  //Search and display meals whose Names contain the search term
  searchByName(inputName: string){
    this.resetList();

    //this.meals now contains only the meals matching the searched name
    this.meals = this.meals.map(items => items.filter(function(item: MealID):boolean{ return item.Name.toLowerCase().includes(inputName.toLowerCase()); }));
  }

  //Search and display meals whose Ingredients contain the search term
  searchByIngredients(inputIngredients: string){
    this.resetList();

    //this.meals now contains only the meals matching the searched ingredient
    this.meals = this.meals.map(items => items.filter(item => item.Ingredients.toLowerCase().includes(inputIngredients.toLowerCase())));
  }

  //Search and display meals whose Calories are less than or equal to the inputCalories
  searchByCalories(inputCalories: number){
    this.resetList();

    //this.meals now contains only the meals having <= the input calories
    this.meals = this.meals.map(items => items.filter(item => item.Calories <= inputCalories));
  }

  //Add selectedMeal to meal history
  logMeal(){
    this.data.collection('users/' + firebase.auth().currentUser.uid + '/loggedMeals').add({
      id: this.selectedMeal.id,
      Name: this.selectedMeal.Name,
      Ingredients: this.selectedMeal.Ingredients,
      Calories: this.selectedMeal.Calories,
      Date: new Date().toLocaleDateString()
    })

    this.logResetList();
    
  }

  //Search and display exercises whose Names contain the search term
  logSearchByName(inputName: string){
    this.logResetList();


    //this.loggedMeals now contains only the exercises matching the searched name
    this.loggedMeals = this.loggedMeals.map(items => items.filter(item => item.Name.toLowerCase().includes(inputName.toLowerCase())));
  }

  //Search and display exercises whose Dates match the search term
  logSearchByDate(inputDate: string){
    this.logResetList();


    //this.loggedExercises now contains only the exercises matching the searched date
    this.loggedMeals = this.loggedMeals.map(items => items.filter(function(item: LogMealID){
      var convertLocaleDate = new Date(item.Date);
      var convertLocaleDateInput = new Date(inputDate);
      return convertLocaleDate.getTime() === convertLocaleDateInput.getTime();
    }));
  }

  logSort(){
    this.loggedMeals = this.loggedMeals.map( items => items.sort(function(a,b): number{
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
    this.selectedLogMeal = null;
    this.loggedMeals = this.data.collection<LogMeal>('users/' + firebase.auth().currentUser.uid + '/loggedMeals').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as LogMeal;
        const logId = a.payload.doc.id;
        return { logId, ...data };
      });
    });
  }

  onLogSelect(meal: LogMealID){
    this.selectedLogMeal = meal;
  }

  selectedLogMeal: LogMealID;
  loggedMeals: Observable<LogMealID[]>;

  ngOnInit() {
  }

}
