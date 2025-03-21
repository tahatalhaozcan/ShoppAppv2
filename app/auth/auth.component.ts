import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth-response';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean=false;
  error:string="";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  handleAuth(form:NgForm)
  {
    if(!form.valid)
    {return;}
    const email = form.value.email;
    const password = form.value.password;

    let authResponse: Observable<AuthResponse>;



    if(this.isLoginMode)
    {
      authResponse =this.authService.login(email,password);
    }
    else
    {
      authResponse =this.authService.register(email,password);

    }

    authResponse.subscribe({

      next: (response) => {
        this.error = ""
        console.log(response)
      },
      error:(err)=> {
        this.error = err;

        console.log(err)
      }

    });
  }

}
