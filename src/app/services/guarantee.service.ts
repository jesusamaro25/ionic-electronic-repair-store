import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Guarantee } from 'src/app/clases/guarantee';
import { GUA } from 'src/assets/data/guarantee';
 
@Injectable({
  providedIn: 'root'
})
export class GuaranteeService {
  gua: Guarantee[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getGuarantee(): Observable<Guarantee[]> {
    return of(GUA);
  }

  getGuaranteeDetail(id): Observable<Guarantee>{
  return of(GUA.find(guara => guara.id === id));
  }

}