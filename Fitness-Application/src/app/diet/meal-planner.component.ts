import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class Meal {
  Name: string;
  Ingredients: string;
  Calories: number;
}

export class MealID extends Meal{
  id: string;
}

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  selectedMeal: Meal;
  onSelect(meal: Meal): void {
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

    this.selectedMeal = null;

    //this.meals now contains only the meals matching the searched name
    this.meals = this.meals.map(items => items.filter(item => item.Name.toLowerCase().includes(inputName.toLowerCase())));
  }

  //Search and display meals whose Ingredients contain the search term
  searchByIngredients(inputIngredients: string){
    this.resetList();

    this.selectedMeal = null;

    //this.meals now contains only the meals matching the searched ingredient
    this.meals = this.meals.map(items => items.filter(item => item.Ingredients.toLowerCase().includes(inputIngredients.toLowerCase())));
  }

  //Search and display meals whose Calories are less than or equal to the inputCalories
  searchByCalories(inputCalories: number){
    this.resetList();

    this.selectedMeal = null;

    //this.meals now contains only the meals having <= the input calories
    this.meals = this.meals.map(items => items.filter(item => item.Calories <= inputCalories));
  }

  ngOnInit() {
  }

}
