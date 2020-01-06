import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import * as moment from 'moment';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.page.html',
  styleUrls: ['./suscribe.page.scss'],
})
export class SuscribePage implements OnInit {

  subscribeGroup: FormGroup;
  info: any;
  birth: Date;
  genders: Array<string>;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public loading: LoadingService, private toastCtrl: ToastController, private formBuilder: FormBuilder, private services: ServicesService, public alertCtrl: AlertController, private router: Router) {
    this.genders = [
      "H",
      "M"
    ];

    this.subscribeGroup = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ])),
      birth: new FormControl('', Validators.required)
    });

    console.log(this.subscribeGroup);

    this.getInfo();
  }

  ngOnInit() {
  }

  format() {
    this.birth = this.subscribeGroup.get('birth').value;
    return moment(this.birth).format('DD-MM-YYYY');
  }

  getInfo() {
    this.services.getAll('empresa').then((val) =>  {
      this.info = val.data;
    })
  }
 /* onSubscribe() {

   // if (this.subscribeGroup.get('name').valid && this.subscribeGroup.get('lastname').valid && this.subscribeGroup.get('gender').valid && this.subscribeGroup.get('email').valid && this.subscribeGroup.get('birth').valid) {
      const datos = new FormData();
      datos.append('nombre', this.subscribeGroup.get('name').value);
      datos.append('apellido', this.subscribeGroup.get('lastname').value);
      datos.append('sexo', this.subscribeGroup.get('gender').value);
      datos.append('correo', this.subscribeGroup.get('email').value);
      datos.append('fechaNacimiento', this.format());

      this.services.createFormData(datos, 'cliente').then((result) => {
        console.log("Datos guardados");
        console.log(datos);
      }, (err) => {
        console.log(err);
      });
 }*/

  async alertSubs() {

    const datos = new FormData();
    datos.append('nombre', this.subscribeGroup.get('name').value);
    datos.append('apellido', this.subscribeGroup.get('lastname').value);
    datos.append('sexo', this.subscribeGroup.get('gender').value);
    datos.append('correo', this.subscribeGroup.get('email').value);
    datos.append('fechaNacimiento', this.format());
   this.loading.showLoader();
    this.services.createFormData(datos, 'cliente').then(async (result: any) => {
      console.log("MENSAJEEE:",result.message.code);
      if(result.message.code=='E000'){
        console.log("No te registras");
        //
        this.loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: 'Error al registrar, ya hay un usuario registrado con ese correo, por favor intente con otro',
          duration: 6000,
          showCloseButton: true,
          closeButtonText: 'X',
          color: 'danger'
        });
        await toast.present();
        //
      }
      else {
      console.log("Datos guardados");
      console.log(datos);
      //////////
      let toast = await this.toastCtrl.create({
        message: 'Suscripción exitosa',
        duration: 6000,
        showCloseButton: true,
        closeButtonText: 'X',
      });

      await toast.present();
      this.loading.dismiss();
      this.router.navigate(['/']);
      /////////
  }
    }, (err) => {
      console.log(err);
      err.data
    });//////////////////////////////////////////////
   
  
}

  async alertMesage() {
    if(this.subscribeGroup.valid){
      const alert = await this.alertCtrl.create(
        {
          header: 'Alerta',
          message: '¿Está seguro que los datos son correctos?',
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
                this.alertSubs();
                //this.router.navigate(['/app1/tab-technical/home-technical']);
              }
            }
          ]
        });
      await alert.present();
    }else{
      let toast = await this.toastCtrl.create({
        message: 'Compruebe que los datos son correctos o que todos los campos estén llenos',
        duration: 6000,
        showCloseButton: true,
        closeButtonText: 'X',
        color: 'danger'
      });
      await toast.present();
    }
    
  }

  /*async alertSubs() {
    //if (this.subscribeGroup.get('name').valid && this.subscribeGroup.get('lastname').valid && this.subscribeGroup.get('gender').valid && this.subscribeGroup.get('email').valid && this.subscribeGroup.get('birth').valid) {

      this.onSubscribe();

      let toast = await this.toastCtrl.create({
        message: 'Suscripción exitosa',
        duration: 6000,
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'X',
      });

      await toast.present();
      this.router.navigate(['/']);
    
  }*/

}