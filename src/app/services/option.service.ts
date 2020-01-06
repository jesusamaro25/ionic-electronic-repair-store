import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Option } from 'src/app/clases/option';
import { OPT } from 'src/assets/data/option'

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  opt: Option[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getOption(): Observable<Option[]> {
    return of(OPT);
  }

  getOptionDetail(id): Observable<Option>{
  return of(OPT.find(options => options.id === id));
  }

}
