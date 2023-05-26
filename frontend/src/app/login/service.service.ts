import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Model } from './model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get('/api/getData')
  }
}
