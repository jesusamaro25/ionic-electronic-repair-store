import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Budget } from 'src/app/clases/budgets';
import { BUDGET } from 'src/assets/data/budgets';
 
@Injectable({
    providedIn: 'root'
  })

  export class BudgetsService {
    budg: Budget[];
    constructor( private http:HttpClient) { }
  
  
    getBudget(): Observable<Budget[]> {
      return of(BUDGET);
    }
  
    getBudgetDetail(id): Observable<Budget>{
    return of(BUDGET.find(budget => budget.id === id));
    }
  
  }
  