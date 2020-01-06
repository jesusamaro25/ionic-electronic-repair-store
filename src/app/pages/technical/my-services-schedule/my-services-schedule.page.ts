import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-my-services-schedule',
  templateUrl: './my-services-schedule.page.html',
  styleUrls: ['./my-services-schedule.page.scss'],
})
export class MyServicesSchedulePage implements OnInit {
  serviceId=+this.route.snapshot.paramMap.get('id');
  techId=+this.route.snapshot.paramMap.get('techId');
  tareas: any[];
  constructor(private services: ServicesService, private toastCtrl: ToastController,public alertCtrl: AlertController,public route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.getDetail();

  }
  ionViewDidLeave(){
    this.tareas = [];
    console.log('imprime',this.tareas);
  }
  async alertEndServ(id) {
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
              this.alertMessage();
              this.endTask(id);
              //this.router.navigate(['/my-services']);
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
  this.router.navigate(['/my-services']);
 }
 getDetail(){
  //const id = +this.route.snapshot.paramMap.get('id');
  this.services.getDetail('ordenServicio',+this.serviceId+'/agendasPorCompletar')
      .then( data => {
        console.log('esto es lo que me traigo',data);
        this.tareas=data.data;
        console.log('esto es lo que almaceno',this.tareas);
      }, err => {
        console.log(err);
      }); 
}

endTask(id){
  const post = new FormData();
   this.services.createFormData(post,'agenda/'+id+'/completar').then((result) => {
   }, (err) => {
     console.log(err);
   });
   console.log('este id se ha eliminado',id);

}

}
