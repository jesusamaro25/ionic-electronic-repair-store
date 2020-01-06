import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad  {
  constructor( private services: ServicesService ) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {

    return this.services.validToken();
  }
}
