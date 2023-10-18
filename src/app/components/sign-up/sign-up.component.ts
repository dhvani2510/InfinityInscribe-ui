import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private httpClient: HttpClient, private router: Router) {}

  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  username: string = '';
  bio: string = '';

  url = "http://localhost:10083/user/signup";

  alert = false;
  emailused = false;

  onSubmit() {
    const json = {
      name: this.name,
      phone: this.phone,
      password: this.password,
      email: this.email,
      bio: this.bio,
      username: this.username
    };

    this.httpClient.post(this.url, json).subscribe((res: any) => {
      if (res) {
        this.alert = true;
        this.router.navigate(['/login']);
      } else {
        this.emailused = true;
      }
    });
  }
}
