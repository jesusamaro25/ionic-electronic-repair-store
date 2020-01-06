import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Promotion } from 'src/app/clases/promotion';
import { PRO } from 'src/assets/data/promotions'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  pro: Promotion[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getPromotion(): Observable<Promotion[]> {
    return of(PRO);
  }

  getBudgetDetail(idPromocion): Observable<Promotion>{
  return of(PRO.find(promotions => promotions.idPromocion === idPromocion));
  }

}
