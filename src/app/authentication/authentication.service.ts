import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // authentication(user: any): Observable<any> {
  //   console.log(user);
  //   return this.httpClient.post(`${environment.api}/`, user);
  // }

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     return false;
  //   }
  //   return true;
  // }

  // logout(): void {
  //   localStorage.clear();

  //   this.router.navigateByUrl("/authentication/login");
  // }
}
