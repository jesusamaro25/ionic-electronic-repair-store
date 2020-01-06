import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private services: ServicesService, private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router) { }

  option: any[] = [];

  nombreOpcion = "";
  loadOpts() {
    this.services.getAll('tipoComentario') 
   .then(data => {
     this.option=data.data;
   }, err => {
     console.log(err);
   }); 
  }
  onChange(event){
    this.nombreOpcion = event.detail.value;
  }

  contactGroup = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    option: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ¡¿!?,.;]+$')
    ]))
  });

  ngOnInit() {
    this.loadOpts();
  }

  async onSubmit() {

    this.contactGroup.get('option').setValue(this.nombreOpcion);

    if (this.contactGroup.invalid) {
      let toast = await this.toastCtrl.create({
        message: 'Compruebe que todos los campos estén correctos o estén completos.',
        duration: 6000
      });
    await toast.present();
    }
    else
    {
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
                this.crearSolicitud();
                this.alertMessage();
              }
            }
        ]
      });
      await alert.present();
    }
  }

  async alertMessage() 
  {
    let toast = await this.toastCtrl.create({
      message: 'Gracias por contactarnos. Nos estaremos comunicando pronto con usted.',
      duration: 6000,
    });
  await toast.present();
  this.router.navigate(['/index']);
  this.contactGroup.reset();
  }

  crearSolicitud(){
   
    const datos = new FormData();
    datos.append('correo',this.contactGroup.get('email').value);
     datos.append('descripcion',this.contactGroup.get('comment').value);
     datos.append('idTipoComentario',this.contactGroup.get('option').value);
    /* console.log('correo',this.contactGroup.get('email').value);
     console.log(this.contactGroup.get('comment').value);
     console.log('idTipoComentario',this.contactGroup.get('option').value);*/
    //console.log(datos);
 this.services.createWithoutToken(datos,'comentario/usuarioNoRegistrado').then((result) => {
     }, (err) => {
       console.log(err);
     });
    
   }

}
 