import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<any[]>('/assets/data/tipo_servicio.json');
  }
  getMenuOpts() {
    return this.http.get('/assets/data/promotions.json');
  }
  getBud() {
    return this.http.get('/assets/data/budget.json');
  }
  getBudD() {
    return this.http.get('/assets/data/budget-detail.json');
  }
  

  getEquipo() {
    return this.http.get<any[]>('/assets/data/tipo_equipo.json');
  }
}

