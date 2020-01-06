import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PushService {
mensajes:OSNotificationPayload[]=[
 /*title:"titulo de la push",
  body:"body de la push",
  date: new Date()*/
];
userId: string;

pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal, private storage: Storage, public router: Router) { 
    this.cargarMensajes();
  }

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }
  
  initialConfig(){
    this.oneSignal.startInit('178f6ac7-8e8a-4f1e-923e-5bfb4f46b65a', '447595567092');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

this.oneSignal.handleNotificationReceived().subscribe((noti) => {
 // do something when notification is received
 console.log('notificacion recibida', noti);
this.notificacionRecibida(noti);
});

this.oneSignal.handleNotificationOpened().subscribe( async( noti ) => {
  // do something when a notification is opened
  console.log('Notificación abierta', noti );
  await this.notificacionRecibida( noti.notification );
  let payload = noti; // getting id and action in additionalData.
      this.redirectToPage(payload);
});
// Obtener ID del suscriptor
this.oneSignal.getIds().then( info => {
  this.userId = info.userId;
  console.log(this.userId);
});
this.oneSignal.endInit();
  }

  async notificacionRecibida( noti: OSNotification ) {

    await this.cargarMensajes();

    const payload = noti.payload;

    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID );

    if ( existePush ) {
      return;
    }

    this.mensajes.unshift( payload );
    this.pushListener.emit( payload );

    await this.guardarMensajes();

  }
  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes );
  }

  async cargarMensajes() {
//this.storage.clear();
    this.mensajes =  await this.storage.get('mensajes') || [];

   return this.mensajes;

  }
 async borrarMensajes(){
  await  this.storage.clear();
  this.mensajes=[];
  this.guardarMensajes();
  }
  redirectToPage(data) { 
    let type
    try {
      type = data.notification.payload.additionalData.entidad;
    } catch (e) {
      console.warn(e);
    }
    switch (type) {
      case 'solicitudServicio': 
        this.router.navigate(['/login']);
        break;
      case 'comment': 
        this.router.navigate(['/login']);
        break;
      default:
          this.router.navigate(['/login']);
      }
    }
}
