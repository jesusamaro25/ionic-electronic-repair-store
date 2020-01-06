import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //paso 1
import { Observable, of } from 'rxjs';
import { Service } from 'src/app/clases/service';
import { SERV } from 'src/assets/data/my_services';
import { Storage } from '@ionic/storage';
import { from as fromPromise } from 'rxjs';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  //paso 2
  url = "http://68.183.117.24:8900/";
  token:string=null;
  //paso3
  //este header es para asegurarse de trabajar con el formato json
  /*headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem("token")
  });*/

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }
 /* private getAuthHeaders(): Observable<any> {
    return fromPromise(this.storage.get('token'));
  }*/

  //paso 4
  async getAll(metodo: string): Promise<any> {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.getAuthHeaders()
       Authorization: 'Bearer ' + await this.storage.get("token")
    });
    return this.http.get(this.url + metodo, { headers: head }).toPromise();

  }

  //MÉTODO POST PARA IMÁGENES (USA FORMDATA EN VEZ DE JSON)
  async createFormData(datos, metodo: string) {
    const head = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + await this.storage.get("token")
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.url + metodo, datos, { headers: head })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //MÉTODO POST SIN IMÁGENES (USA JSONS)
 async create(metodo: string): Promise<any> {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.getAuthHeaders()
       Authorization: 'Bearer ' + await this.storage.get("token")
    });
    return this.http.post(this.url + metodo, { headers: head});
  }

  getSer(): Observable<Service[]> {
    return of(SERV);
  }

  //paso 4
  async getDetail(metodo: string, id): Promise<any>{
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.getAuthHeaders()
       Authorization: 'Bearer ' + await this.storage.get("token")
    });
    return this.http.get(this.url + metodo + '/' + id, { headers: head }).toPromise();
  }

  async putFormDataSingle(datos, metodo: string) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + metodo, (datos))
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }
  
  async createWithoutToken(datos, metodo: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + metodo, datos)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async loadToken() {

    this.token = await this.storage.get('token') || null;

  }
  async validToken(): Promise<boolean> {

    await this.loadToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    else {
      return Promise.resolve(true);

    }
  }
}