import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url=" http://68.183.117.24:8900/";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    
  });



  constructor(public http: HttpClient) { }

  login(credentials) {
    return new Promise((resolve, reject) => {

      this.http.post(this.url +'login',credentials)
        .subscribe(res => {
          let datos = JSON.parse(JSON.stringify(res));

          resolve(datos);
        }, (err) => {
          reject(err);
        });
    });

  }

}
