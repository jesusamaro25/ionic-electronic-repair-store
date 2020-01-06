import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Budget } from 'src/app/clases/budget';
import { BUG } from 'src/assets/data/budget'
 
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  bud: Budget[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getBudget(): Observable<Budget[]> {
    return of(BUG);
  }

  getBudgetDetail(id): Observable<Budget>{
  return of(BUG.find(budgets => budgets.id === id));
  }

}
