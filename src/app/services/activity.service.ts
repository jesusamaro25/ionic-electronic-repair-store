import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from 'src/app/clases/activity';
import { ACT } from 'src/assets/data/activity'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  act: Activity[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getActivity(): Observable<Activity[]> {
    return of(ACT);
  }

  getActivityDetail(id): Observable<Activity>{
  return of(ACT.find(acti => acti.id === id));
  }

}
