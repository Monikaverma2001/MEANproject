import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Model } from './model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<any>('/api/getData')
  }
}
