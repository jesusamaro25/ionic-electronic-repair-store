import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Term } from 'src/app/clases/term';
import { TER } from 'src/assets/data/term'

@Injectable({
  providedIn: 'root'
})
export class TermService {
  ter: Term[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getTerm(): Observable<Term[]> {
    return of(TER);
  }

  getTermDetail(id): Observable<Term>{
  return of(TER.find(terms => terms.id === id));
  }

}
