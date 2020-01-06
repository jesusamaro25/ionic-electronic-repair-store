import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Homework } from 'src/app/clases/homework';
import { HOME } from 'src/assets/data/homework'

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  opt: Homework[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getOption(): Observable<Homework[]> {
    return of(HOME);
  }

  getOptionDetail(id): Observable<Homework>{
  return of(HOME.find(options => options.id === id));
  }

}
