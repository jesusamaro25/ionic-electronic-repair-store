import { Component, OnInit} from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  tareas: any[];
  constructor(private services: ServicesService, public toastCtrl: ToastController,public alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.getAll();
   }
   ionViewDidLeave(){
     this.tareas = [];
     console.log('imprime',this.tareas);
   }
   
   endTask(id){
         const post = new FormData();
          this.services.createFormData(post,'agenda/'+id+'/completar').then((result) => {
          }, (err) => {
            console.log(err);
          });
          console.log('este id se ha eliminado',id);

  }
  
   getAll() {
 
     this.services.getAll('agenda/misAgendasPendientes') 
       .then(data => {
         console.log('esto es lo que me traigo', data);
         this.tareas = data.data;
       }, err => {
         console.log(err);
       });
   }
  async alertEndSche(id) {
    const alert = await this.alertCtrl.create(
      {
        header: 'Alerta',
        message: '¿Desea finalizar el servicio?',
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'secondary',
            handler: () => {
            }
          },
          {
            text: 'Aceptar',
            cssClass: 'secondary',
            handler: () => {
              this.endTask(id);
              this.alertMessage();
              //this.router.navigate(['/app1/tab-technical/home-technical']);
            }
          }
        ]
      });
    await alert.present();
  }

  async alertMessage() 
  {
  
    let toast = await this.toastCtrl.create({
      message: 'Servicio finalizado exitosamente',
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X'
    });
  await toast.present();
  this.router.navigate(['/app1/tab-technical/home-technical']);
 }
 doRefresh(event){
  this.services.getAll('agenda/misAgendasPendientes') 
  .then(data => {
    console.log('esto es lo que me traigo', data);
    this.tareas = data.data;
event.target.complete();
  }, err => {
    console.log(err);
  });
 
}
  }
