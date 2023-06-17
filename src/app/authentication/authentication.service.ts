import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(user: any): any {
    return this.httpClient.post(`${environment.api}/login`, user);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('token');
  }

  logout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/authentication/login']);
  }
}
