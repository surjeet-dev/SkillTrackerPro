import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private apiUrl = 'https://localhost:7100/api/Departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> { 
    return this.http.get<Department[]>(this.apiUrl); 
  }

  createDepartment(payload: { name: string }): Observable<Department> { 
    return this.http.post<Department>(this.apiUrl, payload); 
  }

  updateDepartment(id: number, payload: { name: string }): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, { id, ...payload });
  }



  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
