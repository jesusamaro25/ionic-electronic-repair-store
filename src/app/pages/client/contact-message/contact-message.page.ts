import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
 


@Component({

  selector: 'app-contact-message',
  templateUrl: './contact-message.page.html',
  styleUrls: ['./contact-message.page.scss'],
})
export class ContactMessagePage implements OnInit {
   
  option: any[];
  findText = '';
  serviceGroup: FormGroup;
  nombreOpcion = "";
   mensaje = "";
  
  
 
  constructor(private alertCtrl: AlertController, private services: ServicesService, public toastCtrl: ToastController ,private router: Router , private formBuilder: FormBuilder,) { }
  
  
  ngOnInit() {
    
    this.serviceGroup =this.formBuilder.group({
  
      option: ['', Validators.required],
      comentario: ['', Validators.required]
     });
this.loadOpts();
  }
  crearSolicitud(){
   
    const datos = new FormData();
     datos.append('descripcion',this.serviceGroup.value.comentario);
     datos.append('idTipoComentario',this.serviceGroup.value.option.id);
this.services.createFormData(datos,'comentario').then((result) => {
     }, (err) => {
       console.log(err);
     });
    
   }
   
  loadOpts() {
    this.services.getAll('tipoComentario') 
   .then(data => {
     this.option=data.data;
   }, err => {
     console.log(err);
   }); 
  }
  generarLink() { 
   
 
    this.nombreOpcion = this.serviceGroup.value.option.id;
    this.mensaje = this.serviceGroup.value.comentario;

  }


async presentContact() 
{

  let toast = await this.toastCtrl.create({
    header: 'Solicitud enviada',
    message: 'En las próximas horas nos estaremos comunicando con usted.',
    duration: 6000,
    color: 'dark',
    showCloseButton: true,
    closeButtonText: 'X',
  });
await toast.present();
this.router.navigate(['/contact']);
}

async onSubmit() {
    const alert = await this.alertCtrl.create(
      {
      header: 'Alerta',
      message: '¿Está seguro de enviar la información?',
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
              this.presentContact();
              this.crearSolicitud();
            }
          }
      ]
    });
    await alert.present();
  }
}


