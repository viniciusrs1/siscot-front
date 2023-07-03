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
    return this.httpClient.post<void>(
      `${environment.api}/pacientes`,
      user,
      { withCredentials: true }
    );
  }

  getPatients(): Observable<void> {
    return this.httpClient.get<void>(
      `${environment.api}/pacientes`,
      { withCredentials: true }
    );
  }

  getPatientsById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.api}/pacientes/${id}`,
      { withCredentials: true }
    );
  }

  updatePatient(user: any): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.api}/pacientes/${user.id}`,
      user,
      { withCredentials: true }
    );
  }

  deletePatient(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}/pacientes/${id}`,
      { withCredentials: true }
    );
  }
}
