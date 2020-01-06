import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Revision } from 'src/app/clases/revision';
import { REVIEW } from 'src/assets/data/my_reviews';

@Injectable({
    providedIn: 'root'
  })

  export class ReviewsService {
    rev: Revision[];
    constructor( private http:HttpClient) { }
  
  
    getRev(): Observable<Revision[]> {
      return of(REVIEW);
    }
  
    getRevDetail(id): Observable<Revision>{
    return of(REVIEW.find(review => review.id === id));
    }
  
  }
  