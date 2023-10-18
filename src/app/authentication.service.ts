import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }
  
  authenticate(email: string,password:string)
  {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
          map ((data:any) => {
              sessionStorage.setItem('token',data.data.token);
          }
      ));
  }

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  logoutService()
  {
    sessionStorage.removeItem('token');
  }

  setToken(token: string | null): void {    
    this.tokenSubject.next(token);

    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }

  addHeaders(){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({ Authorization: " Bearer " + token });

    return headers;
  }

  getToken() {
    return this.tokenSubject.getValue();
  }
}
