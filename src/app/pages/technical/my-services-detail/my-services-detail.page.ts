import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-my-services-detail',
  templateUrl: './my-services-detail.page.html',
  styleUrls: ['./my-services-detail.page.scss'],
})
export class MyServicesDetailPage implements OnInit {
  order: any[];
  id=+this.route.snapshot.paramMap.get('id');
  constructor(private toastCtrl: ToastController,private services: ServicesService, private route: ActivatedRoute, public alertCtrl: AlertController, private router: Router) { }
  data:any;
  ngOnInit() {
    this.getDetail();

  }
  getDetail(){
    //const id = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail('ordenServicio', this.id)
        .then( data => {
          console.log('esto es lo que me traigo',data);
          this.order=Array.of(data.data);
          //console.log(this.idTipoEquipo);
          console.log('esto es lo que almaceno',this.order);
        }, err => {
          console.log(err);
        }); 
  }

  async alertEndServ() {
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
            this.endService();
              //this.router.navigate(['/app1/tab-technical/home-technical']);
            }
          }
        ]
      });
    await alert.present();
  }

 endService(){
  const post = new FormData();
   this.services.createFormData(post,'ordenServicio/'+this.id+'/completarReparacion').then((result) => {
    this.data=result
    if(this.data.status==false){
      this.alertError();
    }else{
      this.alertMessage();
      console.log('este id se ha eliminado',this.id);
    }
  }, (err) => {
     console.log(err);
   });

}
async alertError() 
  {
    let toast = await this.toastCtrl.create({
      message: 'Error, faltan actividades por completar',
      duration: 4000,
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();
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
}
