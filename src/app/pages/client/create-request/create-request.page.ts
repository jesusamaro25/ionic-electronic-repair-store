import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ServicesService } from 'src/app/services/services.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  user: any;
  nombreServicio: "";
  nombrePromocion = '';
  marcaEquipo: "";
  modeloEquipo: "";
  falla: "";
  fecha: any;
  hora: "";
  idServicio: any;
  idPromocion: any;
  idModelo: "";
  servicio = "";
  //fechaHoy = moment(Date.now()).format('DD-MM-YYYY');
  fechaHoy=Date.now();
  idtecnico:any;
  horaid:any;
  costo: any[];
  constructor(public alertCtrl: AlertController,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              private services: ServicesService,
              private storage: Storage,
              public toastCtrl: ToastController
              //private alert: functions
              ) {
                //this.user=alert.getLocal();
              }

  ngOnInit() {
    //this.user=this.alert.getLocal();
    this.storage.get('id').then((val) => {
    this.user=val;
    this.loadRange();
  });
    this.nombreServicio = this.rutaActiva.snapshot.params.nombreServicio;
    
    this.marcaEquipo = this.rutaActiva.snapshot.params.marcaEquipo;
    this.modeloEquipo = this.rutaActiva.snapshot.params.modeloEquipo;
    this.falla = this.rutaActiva.snapshot.params.falla;
    this.fecha = moment(this.rutaActiva.snapshot.params.fecha).format('DD-MM-YYYY');
    this.hora = this.rutaActiva.snapshot.params.hora;
    this.idModelo = this.rutaActiva.snapshot.params.idModelo;
    
    this.idServicio = this.rutaActiva.snapshot.params.idServicio;
    this.idtecnico=this.rutaActiva.snapshot.params.idtecnico;
    this.horaid = this.rutaActiva.snapshot.params.horaid;
    console.log('idtecnico',this.idtecnico);
    console.log('idmodelo',this.idModelo);
    console.log('idservicio',this.idServicio);
    console.log('falla',this.falla);
    console.log('fecha',this.fecha);
    console.log('bloque',this.horaid);
    console.log('idUsuario',this.user);
    this.rutaActiva.queryParams
    .subscribe(params => {
      this.idPromocion = params['idPromocion'] || 0; 
      let prueba = params['nombrePromoción'];
      if(prueba === ""){
        this.nombrePromocion = "Sin promoción!!"
      }else
        this.nombrePromocion = params['nombrePromocion'];
      
    });
   

  }

  getFecha() {
    const fecha = Date();
    console.log('Fecha de creación de solicitud:', fecha);
  }

  transform(): any {
  
    return moment(this.fechaHoy).format('DD-MM-YYYY'); 
   
  }

  async alertSendSol() {
    const alert = await this.alertCtrl.create(
      {
        header: 'Alerta',
        message: '¿Está seguro de enviar la solicitud?',
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'secondary',
            handler: () => {

              //this.router.navigate(['']);
            }
          },
          {
            text: 'Aceptar',
            cssClass: 'secondary',
            handler: () => {
              this.crearSolicitud();
             // console.log('IdServicio:', this.idServicio);
             // console.log('aqui va el id del usuario');
             // console.log('IdPromocion:', this.idPromocion);
             // console.log('IdModelo:', this.idModelo);
            //  console.log('Fecha:', this.fecha);
             // console.log('aquí va el presupuesto');
              this.getFecha();
            }
          }
        ]
      });

    await alert.present();
  }

  async alertCancelSol() {
    const alert = await this.alertCtrl.create(
      {
        header: 'Alerta',
        message: '¿Está seguro de cancelar el proceso?',
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'secondary',
            handler: () => {

              //this.router.navigate(['/createend']);
            }
          },
          {
            text: 'Aceptar',
            cssClass: 'secondary',
            handler: () => {
              this.alertCancelMessage();
            }
          }
        ]
      });
    await alert.present();
  }

  async alertMessage() {
    let toast = await this.toastCtrl.create({
      message: 'Su solicitud ha sido enviada',
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();
  this.router.navigate(['/app/tabs']);
  }

  async alertCancelMessage() {
    let toast = await this.toastCtrl.create({
      message: 'Solicitud cancelada',
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();
  this.router.navigate(['/app/tabs']);
  }

  crearSolicitud(){
    if(this.idPromocion === 0){
      const datos = new FormData();
    datos.append('idModeloEquipo',this.idModelo);
    datos.append('idCatalogoServicio',this.idServicio);
    datos.append('descripcion',this.falla);
    datos.append('idUsuario',this.user);
    datos.append('idTecnico',this.idtecnico);
    datos.append('fechaActividad',this.fecha);
    datos.append('idBloqueHorario',this.horaid);
    for (var key in datos) {
      console.log('la solicitud es',key, datos[key]);
    }
  
this.services.createFormData(datos,'solicitudServicio').then((result:any) => {
  if (result.status) {
    this.alertMessage();
    this.router.navigate(['/app/tabs']);
  } 
  else {
    this.errorMessage();
  }
    }, (err) => {
      console.log(err);
    });
    }else{
   
   const datos = new FormData();
    datos.append('idModeloEquipo',this.idModelo);
    datos.append('idCatalogoServicio',this.idServicio);
    datos.append('descripcion',this.falla);
    datos.append('idUsuario',this.user);
    datos.append('idTecnico',this.idtecnico);
    datos.append('fechaActividad',this.fecha);
    datos.append('idBloqueHorario',this.horaid);
    datos.append('idPromocion',this.idPromocion);
    
    //inspeccionar lo que imprime form data por consola
    for (var key in datos) {
      console.log('la solicitud es',key, datos[key]);
    }
  
this.services.createFormData(datos,'solicitudServicio').then((result:any) => {
  if (result.status) {
    this.alertMessage();
    this.router.navigate(['/app/tabs']);
  } else {
    this.errorMessage();
  }
    }, (err) => {
      console.log(err);
    });
    }  
  }
  loadRange(){
    this.services.getAll('precio') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.costo = Array.of(data.data);
      }, err => {
        console.log("err");

      });
  }
  async errorMessage() {
    let toast = await this.toastCtrl.create({
      message: "Error, no se pudo completar la solicitud porque ya está ocupado el técnico en la hora seleccionada, por favor intente con otra fecha",
      duration: 6000,
      color: "danger",
      showCloseButton: true,
      closeButtonText: "X"
    });
    await toast.present();
  }
}