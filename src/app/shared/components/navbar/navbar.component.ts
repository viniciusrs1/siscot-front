import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private authenticationService: AuthenticationService) {}

  logout(): void {
    this.authenticationService.logout();
  }
}
