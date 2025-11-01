import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Orden {
  constructor(private readonly http: HttpClient) {}
  getAll(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${environment.host}/api/Orden/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(request: any):Observable<any> {
    return this.http.post<any>(`${environment.host}/api/Orden`, request);
  }

  update(id: number, request: any):Observable<any> {
   return this.http.put<any>(`${environment.host}/api/Orden/${id}`, request);
  }

  
  delete(id: number):Observable<any> {
   return this.http.delete<any>(`${environment.host}/api/Orden/${id}`);
  }
  
}
