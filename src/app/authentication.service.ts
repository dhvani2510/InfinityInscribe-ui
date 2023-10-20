import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSubject.asObservable();

  setUserLoggedIn(value: boolean) {
    console.log("set logged in to true "+ value);
    this.userLoggedInSubject.next(value);
  }

  getUserLoggedIn() {
    console.log(this.userLoggedInSubject.value);
    
    return this.userLoggedInSubject.value;
  }

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
      this.userLoggedInSubject.next(!!storedToken);
    }
  }
  
  authenticate(email: string,password:string)
  {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
          map ((data:any) => {
              localStorage.setItem('token',data.data.token);
              // set the token to be used in headers for all requests
              this.tokenSubject.next(localStorage.getItem('token'));              
          }
      ));
  }

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  logoutService()
  {
    localStorage.removeItem('token');
    this.setUserLoggedIn(false);
  }

  setToken(token: string | null): void {    
    this.tokenSubject.next(token);

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  addHeaders(){
    const token=localStorage.getItem("token");
    const headers=new HttpHeaders({ Authorization: " Bearer " + token });

    return headers;
  }

  getToken() {
    return this.tokenSubject.getValue();
  }
}
