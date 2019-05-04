import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { MealPlannerComponent } from './diet/meal-planner.component';

import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'meal-planner', component: MealPlannerComponent },


  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
