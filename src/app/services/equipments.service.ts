import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Equipment } from 'src/app/clases/equipment';
import { EQUIP } from 'src/assets/data/my_equipments'


@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  eq: Equipment[];
  constructor( private http:HttpClient) { }

  /*getEquipments(){
    return this.http.get<any[]>('/assets/data/my_equipments.json');
  }*/

  getEq(): Observable<Equipment[]> {
    return of(EQUIP);
  }

  getEqDetail(id): Observable<Equipment>{
  return of(EQUIP.find(equipment => equipment.id === id));
  }

}
