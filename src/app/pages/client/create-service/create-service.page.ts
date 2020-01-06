import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service'
import { ToastController, ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  service: any[] = [];
  requests: any[] = [];
  nombreSer: string;

  findText = "";
//paso 4, esto es lo que recibe por parametro la funcion que trae a todos los servicios, y es el nombre de la tabla del MER
metodo="catalogoServicio";
  constructor(private services: ServicesService, public toastCtrl: ToastController, private modalCtrl: ModalController ) {}

  ngOnInit() {
   // this.getService();// M'ETODO VIEJO QUE CONSUME DATOS DEL TS
//paso 5
  this.services.getAll(this.metodo)
   .then(data => {
     console.log(data);
     this.service=data.data;
     
   }, err => {
     console.log(err);
   }); 
this.getRequests();
  }
//METODO VIEJO QUE CONSUME DEL TS
 /* getService(){
    this.services.getSer()
        .subscribe( services => {
          console.log( services );
          this.service = services;
      });
  } */
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
  getRequests() {

    this.services.getAll('solicitudServicio/cliente') 
      .then(data => {
        this.requests = data.data;
        console.log('estas son las solicitudes', this.requests);
        if (this.requests.length<1){
          this.message();
        }
      }, err => {
        console.log(err);
      });
  }
  async message() 
{

  /*let toast = await this.toastCtrl.create({
    header: 'prueba',
    message: 'pruebaaaa.',
    duration: 6000,
    color: 'dark',
    showCloseButton: true,
    closeButtonText: 'X',
  });
await toast.present();*/
const modal= await this.modalCtrl.create({
  component: ModalInfoPage
});
await modal.present();
//const { data } = await modal.onDidDismiss();
}


}
