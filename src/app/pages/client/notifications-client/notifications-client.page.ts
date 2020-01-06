import { IonList } from '@ionic/angular';
import { Component, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { PushService } from 'src/app/services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notifications-client',
  templateUrl: './notifications-client.page.html',
  styleUrls: ['./notifications-client.page.scss'],
})
export class NotificationsClientPage implements OnInit {
  idprueba='';
  i='';
  logo:any;
 mensajes: OSNotificationPayload[]=[];
  public notifications: any  = [

    {
      notification: 
        {
          name:'Nuevo presupuesto',
          email: '¡Has recibido un nuevo presupuesto!',
          id: 1
        }
    },

    {
      notification: 
        {
          name:'Nuevo presupuesto',
          email: '¡Has recibido un nuevo presupuesto!',
          id: 2
        }   
    }, 
    {
      notification: 
        {
         name:'Nuevo presupuesto',
         email: '¡Has recibido un nuevo presupuesto!',
         id: 3
        }
    }
 
];
  constructor(private router: Router, public pushService: PushService, private applicationRef: ApplicationRef, private services: ServicesService) { }

  ngOnInit() {
    this.pushService.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
     this.applicationRef.tick();
     let payload = noti; // getting id and action in additionalData.
     // this.redirectToPage(payload);
    });
    this.getInfo();
  }
  getInfo() {
    this.services.getAll('empresa').then((val) =>  {
      this.logo = val.data;
      console.log(this.logo);
    })
  }
  async ionViewWillEnter() {

    console.log('Will Enter - Cargar mensajes');
   // this.userId = await this.pushService.getUserIdOneSignal();

    this.mensajes = await this.pushService.getMensajes();

  }
  
  borrar(id) {
    
    
    
    var pos;
    console.log(this.notifications.length);
    for(let j=0; j<this.notifications.length; j++) {
      if(this.notifications[j].notification.id === id) {
        pos = j;
      } //guardo la posicion del objeto dentro del arreglo que tiene el id igual al id que envio como parametro
    } 
    this.notifications.splice(pos,1); //el primer parametro indica la posicion en donde empezaré a eliminar, y el segundo indica cuantos eliminaré

   console.log("la notificación con el id " + id + " ha sido eliminada posicion del arreglo: " +pos);


}
doRefresh(event) {
  console.log('Actualizando');

  setTimeout(() => {
    console.log('Actualización completada');
    event.target.complete();
  }, 1500);
}
/*goTo(){
  if (this.entidad=="solicitudServicio"){
    this.router.navigate(['/requests']);
  }
  else {
    this.router.navigate(['/contact']);
  }
}*/
/*goTo(){
  this.router.navigate(['/requests']);
}*/
redirectToPage(data) { 
  //let type
  try {
   // type = data.notification.payload.additionalData.entidad;
  } catch (e) {
    console.warn(e);
  }
  switch (data) {
    case 'solicitudServicio': 
      this.router.navigate(['/requests']);
      break;
    case 'promocion': 
      this.router.navigate(['/promotions']);
      break;
      case 'comentario': 
      this.router.navigate(['/contact']);
      break;
    case 'agenda': 
      this.router.navigate(['/my-equipments']);
      break;
      case 'garantia': 
      this.router.navigate(['/guarantee']);
      break;
    default:
        this.router.navigate(['/requests']);
    }
  }
}
