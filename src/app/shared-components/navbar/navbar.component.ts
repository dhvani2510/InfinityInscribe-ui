import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn = false; // You can set this based on your authentication logic
  private subscription: Subscription;

  constructor(private router: Router, private authService:AuthenticationService) { 
    this.subscription = this.authService.userLoggedIn$.subscribe((value) => {
      this.userLoggedIn = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {  
    this.userLoggedIn = this.authService.getUserLoggedIn();
    console.log(this.userLoggedIn);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  showUsers() {

  }

  sendId()  {

  }

  blogpage() {}

  logout() {
    // Implement logout logic here and set userLoggedIn to false
    this.userLoggedIn = false;
    this.router.navigate(['/']);
  }
}
