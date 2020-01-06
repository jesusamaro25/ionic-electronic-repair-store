import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Claims } from 'src/app/clases/claims';
import { CLA } from 'src/assets/data/claims';
 
@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  cla: Claims[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getClaims(): Observable<Claims[]> {
    return of(CLA);
  }

  getClaimsDetail(id): Observable<Claims>{
  return of(CLA.find(claim => claim.id === id));
  }

}