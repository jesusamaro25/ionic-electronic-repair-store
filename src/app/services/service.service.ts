import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Service} from 'src/app/clases/myservice';
import { SERVICE} from 'src/assets/data/service'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
serv: Service[];
  constructor(private http:HttpClient) { }

  getService(): Observable<Service[]> {
    return of(SERVICE);
  }

  getServiceDetail(id): Observable<Service>{
  return of(SERVICE.find(service => service.id === id));
  }

}


