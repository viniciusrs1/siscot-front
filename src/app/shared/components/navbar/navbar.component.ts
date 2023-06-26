import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  name: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.name = this.cookieService.get('nome');

    console.log('nome', this.cookieService.get('nome'));
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
