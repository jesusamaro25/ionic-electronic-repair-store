import { Component, OnInit } from '@angular/core';
/* Hay que importar desde la librería de Angular el Validators (que es para las validaciones nativas del RF),
  el FormControl, el FormBuilder es para un uso opcional.*/
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-change-password-technical',
  templateUrl: './change-password-technical.page.html',
  styleUrls: ['./change-password-technical.page.scss'],
})
export class ChangePasswordTechnicalPage implements OnInit {

  //Se declara el formGroup.
  changePassGroup: FormGroup;
  usuario: User= new User();
  constructor(private storage: Storage, private formBuilder: FormBuilder, private services: ServicesService,private alertCtrl: AlertController, private toastCtrl: ToastController, private router: Router) {
  /*En este caso se usa el formBuilder.group para crear el FormGroup, esto es indistinto, se puede usar el
      FormBuilder o directamente el FormGroup, fue por hacerlo de dos maneras distintas.*/
    this.changePassGroup = this.formBuilder.group({
    npass : new FormControl('', Validators.required),
    cnpass : new FormControl('', Validators.required)
  })
  }

  ngOnInit() {
    this.storage.get('tecnico').then((val) => {
      this.usuario=JSON.parse(val);
      //console.log(this.usuario);
    });
  }


  async alertMessage(){
    let toast = await this.toastCtrl.create({
      message: 'Compruebe que las contraseñas sean válidas o que los campos estén llenos',
      duration: 4000,
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();
  
  }

  async validate(){
    if(this.changePassGroup.get('npass').value === '' || this.changePassGroup.get('cnpass').value === ''){
      this.alertMessage();
    }else{
     const alert = await this.alertCtrl.create(
     {
       header: 'Mensaje',
       message: '¿Está seguro que desea cambiar su contraseña?',
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
              this.onSubmit();
             }
           }
       ]
     });
  
     await alert.present();
    }
  }

  async onSubmit(){
    let id=this.usuario.id;
    const datos = new FormData();
        datos.append('contrasenaAnterior',this.changePassGroup.get('npass').value); //npass se refiere a contrasena anterior
        datos.append('contrasena',this.changePassGroup.get('cnpass').value);
      
           this.services.putFormDataSingle(datos, 'empleado/'+ id).then(async (resp: any) => {
            if (resp.status) {
             let toast = await this.toastCtrl.create({
               message: 'La contraseña ha sido cambiada exitosamente.',
               duration: 5000,
               color: 'dark',
               showCloseButton: true,
               closeButtonText: 'X',
             });
             await toast.present();
               this.router.navigate(['/profile-technical-edit']);
               this.changePassGroup.reset();
            }
            else {
              if (resp.message.text=="La contraseña anterior no coincide" || resp.message.text=="Debe incluir la contraseña anterior si desea cambiar contraseña"){
                let toast = await this.toastCtrl.create({
                  message: ' La contraseña anterior no coincide',
                  duration: 5000,
                  color: 'danger',
                  showCloseButton: true,
                  closeButtonText: 'X',
                });
                await toast.present();
                console.log(resp.message.text);
               //this.changePassGroup.reset();
               }
               else {
             
              let toast = await this.toastCtrl.create({
               message: 'Compruebe que las contraseñas sean válidas o que los campos estén llenos ',
               duration: 5000,
               color: 'danger',
               showCloseButton: true,
               closeButtonText: 'X',
             });
             await toast.present();
             console.log(resp.message);
            //this.changePassGroup.reset();
            }
          }
           }, async (err) => {
            // console.log(err);
            
           });
           ///////////////
        
        
          }
}
