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
  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {}

  register(user: string): Observable<any> {
    return this.httpClient.post(`${environment.api}/register`, user, { withCredentials: true });
  }

  authentication(user: string): void {
    console.log(user);
    this.httpClient.post(`${environment.api}/login`, user, { withCredentials: true }).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        console.error("Erro ao fazer login");
      });
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('token');
  }

  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl("/authentication/login");
  }
}
