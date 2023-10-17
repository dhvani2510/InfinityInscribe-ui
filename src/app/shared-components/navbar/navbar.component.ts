import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn = false; // You can set this based on your authentication logic

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    // Implement logout logic here and set userLoggedIn to false
    this.userLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
