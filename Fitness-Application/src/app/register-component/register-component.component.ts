import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  constructor(private authService : AuthService ) { }

  onSubmit() {

    const email = (<HTMLInputElement> document.getElementById("email")).value
    const password = (<HTMLInputElement>document.getElementById("password")).value
    this.authService.signUp( email , password );
    
  }


  ngOnInit() {
  }

}
