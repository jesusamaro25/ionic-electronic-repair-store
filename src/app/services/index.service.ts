import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Index } from 'src/app/clases/index';
import { IND } from 'src/assets/data/index';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  ind: Index[];
  constructor(private http:HttpClient) { }

  getIndex(): Observable<Index[]> {
    return of(IND);
  }

  /*getIndex() {
    return this.http.get('/assets/data/index.json'); 
  }*/
}
 