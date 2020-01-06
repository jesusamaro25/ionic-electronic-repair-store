import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Rate } from 'src/app/clases/rate';
import { RATE } from 'src/assets/data/rate_service'

@Injectable({
  providedIn: 'root'
})
export class RateService {

  rate: Rate[];
 
  constructor(private http:HttpClient) { }
  getRate(): Observable<Rate[]> {
    return of(RATE);
  }

  getRateDetail(id): Observable<Rate>{
  return of(RATE.find(rate => rate.id === id));
  }
}
