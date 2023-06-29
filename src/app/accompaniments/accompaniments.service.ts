import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccompanimentsService {
  constructor(private httpClient: HttpClient) {}

  addAccompaniment(accompaniment: any): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.api}/acompanhamentos`,
      accompaniment
    );
  }

  getAccompaniments(): Observable<void> {
    return this.httpClient.get<void>(`${environment.api}/acompanhamentos`);
  }

  getAccompanimentById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/acompanhamentos/${id}`);
  }

  updateAccompaniment(accompaniment: any): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.api}/acompanhamentos/${accompaniment.id}`,
      accompaniment
    );
  }

  deleteAccompaniment(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}/acompanhamentos/${id}`
    );
  }

  getPatients(): Observable<void> {
    return this.httpClient.get<void>(`${environment.api}/pacientes`);
  }

  getUsers(): Observable<void> {
    return this.httpClient.get<void>(`${environment.api}/usuarios`);
  }
}
