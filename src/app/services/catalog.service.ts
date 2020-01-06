import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Catalog } from 'src/app/clases/catalog';
//import { CAT } from 'src/assets/data/catalog'
  
@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  cat: Catalog[]

  constructor(private http:HttpClient) { }

  /*getCat(): Observable<Catalog[]> {
    return of(CAT);
  }

  getCatDetail(id): Observable<Catalog>{
  return of(CAT.find(catalog => catalog.id === id));
  }*/

}
 

//cambio