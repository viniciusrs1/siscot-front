import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private httpClient: HttpClient) {}

  addPatient(user: any): Observable<void> {
    return this.httpClient.post<void>(`${environment.api}/pacientes`, user);
  }

  getPatients(): Observable<void> {
    return this.httpClient.get<void>(`${environment.api}/pacientes`);
  }

  getPatientsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/pacientes/${id}`);
  }

  updatePatient(user: any): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.api}/pacientes/${user.id}`,
      user
    );
  }
}
