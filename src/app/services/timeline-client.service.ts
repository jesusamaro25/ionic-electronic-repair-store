import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Timeline_Client } from 'src/app/clases/timeline_client';
import { TLC } from 'src/assets/data/tl_client';

@Injectable({
  providedIn: 'root'
})
export class TimelineClientService {

  tl: Timeline_Client[];

  constructor(private http:HttpClient) { }

  getTimeline(): Observable<Timeline_Client[]> {
    return of(TLC);
  }

  getTLDetail(id): Observable<Timeline_Client>{
  return of(TLC.find( tlc => tlc.id_equipo === id));
  }

  
}
