import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  addUser(user: any): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.api}/usuarios`,
      user,
      { withCredentials: true }
    );
  }

  getUsers(): Observable<void> {
    return this.httpClient.get<void>(
      `${environment.api}/usuarios`,
      { withCredentials: true }
    );
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.api}/usuarios/${id}`,
      { withCredentials: true }
    );
  }

  updateUser(user: any): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.api}/usuarios/${user.id}`,
      user,
      { withCredentials: true }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}/usuarios/${id}`,
      { withCredentials: true }
    );
  }
}
