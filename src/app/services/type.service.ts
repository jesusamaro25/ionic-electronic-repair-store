import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Type } from 'src/app/clases/type';
import { TYPE } from 'src/assets/data/type'

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  opt: Type[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getOption(): Observable<Type[]> {
    return of(TYPE);
  }

  getOptionDetail(id): Observable<Type>{
  return of(TYPE.find(options => options.id === id));
  }

}
