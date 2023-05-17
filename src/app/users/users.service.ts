import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  addUser(user: any): Observable<void> {
    return this.httpClient.post<void>(`${environment.api}/users`, user);
  }

  getUsers(): Observable<void> {
    return this.httpClient.get<void>(`${environment.api}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/users/${id}`);
  }

  updateUser(user: any): Observable<void> {
    return this.httpClient.put<void>(`${environment.api}/users`, user);
  }
}
