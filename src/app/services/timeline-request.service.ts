import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TimelineRequest } from 'src/app/clases/timeline_request';
import { TLR } from 'src/assets/data/timeline_request';

@Injectable({
  providedIn: 'root'
})
export class TimelineRequestService {
  tlr: TimelineRequest[];
  constructor(private http:HttpClient) { }

  getTlRequest(): Observable<TimelineRequest[]> {
    return of(TLR);
  }

  getTLRDetail(id): Observable<TimelineRequest>{
  return of(TLR.find(tlreq => tlreq.id === id));
  }
}
