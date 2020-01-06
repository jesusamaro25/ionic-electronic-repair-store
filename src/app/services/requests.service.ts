import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Request } from 'src/app/clases/request';
import { REQ } from 'src/assets/data/my_requests'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  req: Request[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getRequest(): Observable<Request[]> {
    return of(REQ);
  }

  getRequestDetail(id): Observable<Request>{
  return of(REQ.find(requests => requests.id === id));
  }

}
