import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/clases/contact';
import { CON } from 'src/assets/data/contact'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  con: Contact[];
  constructor( private http:HttpClient ) { }

  /*getRequests(){
    return this.http.get<any[]>('/assets/data/requests.json');
  }*/

  getContact(): Observable<Contact[]> {
    return of(CON);
  }

  getContactDetail(id): Observable<Contact>{
  return of(CON.find(contacts => contacts.id === id));
  }

}
