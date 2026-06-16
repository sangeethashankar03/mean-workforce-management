import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from './record.model';

@Injectable({ providedIn: 'root' })
export class RecordService {
  private api = 'http://localhost:5050/record';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Record[]> {
    return this.http.get<Record[]>(this.api);
  }

  getOne(id: string): Observable<Record> {
    return this.http.get<Record>(`${this.api}/${id}`);
  }

  create(record: Record): Observable<any> {
    return this.http.post(this.api, record);
  }

  update(id: string, record: Record): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, record);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
