import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_key="AIzaSyC7Eh7zgobEPrxAfDdCF-4_DgffKUSKLgo"
  constructor(private http: HttpClient) { }

  register(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError));

  }

  login(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError));
  }

  private handleError(err:HttpErrorResponse){
    let message = "hata oluştu";
    if(err.error.error)
      {
        switch(err.error.error.message){
          case "EMAIL_EXISTS":
            message = "Bu mail adresi kullanımda";
            break;
          case "INVALID_LOGIN_CREDENTIALS":
            message = "Hatalı email ve/veya şifre"
            break;
          case "EMAIL_NOT_FOUND":
            message = "Mail adresi ile hesap bulunamadı"
            break;
        }
      }

    return throwError(()=> message)
  }
}
