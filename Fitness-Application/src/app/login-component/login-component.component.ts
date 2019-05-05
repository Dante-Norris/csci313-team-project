import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service'


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  onSubmit() {
    const email = (<HTMLInputElement> document.getElementById("email")).value
    const password = (<HTMLInputElement>document.getElementById("password")).value
    this.authService.logIn( email , password );
  }

  ngOnInit() {
  }

}
