import { Component, OnInit } from '@angular/core';
/* Hay que importar desde la librería de Angular el Validators (que es para las validaciones nativas del RF),
  el FormControl.*/
import { Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  /* Para el validator, creamos una custom RegEx que valida si el formato del correo es el correcto, esto puede
    ser o no necesario, porque el Validators te valida el correo.*/
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /* Aquí se declara o se crea el formControl: el '' como primer argumento significa que el campo no se setea con
     un valor por defecto, sino que se obtiene del input en el HTML, el Validators.compose() es una función que
     permite tener varios validators "aninados" si se quiere, dentro, se valida que el campo sea obligatorio y
     se usa el Validators.pattern(), que no es más que para usar la RegEx creada más arriba (usa un custom validator);
     el Validators devuelve un booleano, esto se puede usar para las validaciones de más abajo.
  */
  email = new FormControl('',  Validators.compose([
		Validators.required,
    Validators.pattern(this.emailPattern)
	]));

  constructor(private services: ServicesService, private router: Router,private alertCtrl: AlertController, private activated: ActivatedRoute, private toastCtrl: ToastController) {
  }

  ngOnInit() {
  }

  async validate(){
    console.log(this.email.value);

    /*
      La condición del if usa el booleano que devuelve el RF, si el correo es inválido, arroja el mensaje.
    */
    if (this.email.invalid){
      let toast = await this.toastCtrl.create({
        message: `Por favor, ingrese un correo válido`,
        duration: 6000,
        color: 'danger',
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
    }
    
    else{
     /* let toast = await this.toastCtrl.create({
        message: `Su clave temporal ha sido enviada`,
        duration: 6000
      });
      toast.present();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);
      this.email.reset();*/
      
        const alertCtrl = await this.alertCtrl.create(
          {
        
            message: '¿Está seguro que el correo es correcto?',
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
                this.message();
                }
              }
            ]
          });
        await alertCtrl.present();
    }
  }

  async message(){
    let toast = await this.toastCtrl.create({
      message: `Su clave temporal ha sido enviada`,
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X',
    });
    this.router.navigate(['/login']);
    toast.present();
    this.forget();
    this.email.reset();

  }
  forget(){
    const post = new FormData(); //formdatavacio porque no necesita datos
          this.services.createWithoutToken(post,'usuario/reiniciarContrasena?correo='+this.email.value).then((result) => {
            console.log("exito");
          }, (err) => {
            console.log(err);
          });
  }
}