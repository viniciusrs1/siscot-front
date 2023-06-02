import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, elementAt } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  authentication(user: string){
    console.log(user);
    return this.httpClient.post(`${environment.api}/login`, user).subscribe(data => {
      
      const token = JSON.parse(JSON.stringify(data));
      // token = token.token.split(' ')[1]
      localStorage.setItem("token", token.token);
      this.router.navigate(["/"]);
    },
    error => {
      console.error("Erro ao fazer login");
    });
  }

  isAuthenticated(): boolean {

    this.httpClient.get(`${environment.api}/login`,)
    
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.clear();

    this.router.navigateByUrl("/authentication/login");
  }
}
