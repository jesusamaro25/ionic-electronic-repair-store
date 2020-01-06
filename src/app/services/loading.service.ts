import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
isLoading = false;
  constructor(public loadingCtrl: LoadingController) { }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Cargando'
    }).then((res) => {
      res.present();
      if (!this.isLoading) {
        res.dismiss().then(() => console.log('abort presenting'));
      }
    });
  }

  async dismiss(){
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }

}
