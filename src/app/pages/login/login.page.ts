import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { PushService } from 'src/app/services/push.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  idPromocion:any;
  nombrePromocion:any;
  nombreServicio:any;
  idServicio:any;
  idTipoEquipo:any;
  notiID:any;
  usuarioValido: boolean = false;
  datos: any;
  emailp: string;
  logged_user = {
    email: '',
    password: ''
  };

  info: any;

  users: [
    {
      email: 'cliente',
      password: '123'
    },
    {
      email: 'tecnico',
      password: '123'
    }
  ];
  constructor(private rutaActiva: ActivatedRoute, private services: ServicesService ,public pushService: PushService, private route: Router,public loading: LoadingService, public servicio: LoginService,private toastCtrl: ToastController, public alertCtrl: AlertController ,private router:Router, private storage: Storage) { 
    this.getInfo();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
      Validators.required,
  ]);

 async login(){

    if (this.emailFormControl.valid && this.passFormControl.valid) {

      const datos = new FormData();
      datos.append('correo',this.emailFormControl.value);
      datos.append('contrasena',this.passFormControl.value);
      this.loading.showLoader();
      this.servicio.login(datos).then(async (result) => {

        this.datos = result;
        console.log(this.datos);
        if(this.datos.status==true && this.datos.data.rol.tipoRol=='cliente'){
          //metodo que hace que se le envie a la BD el id del dispositivo del cliente
          const datos = new FormData();
          datos.append('mobilePlayerId',this.notiID);
          this.services.putFormDataSingle(datos,'cliente/'+this.datos.data.id).then((result) => {
            console.log('el id es', this.notiID)
          }, (err) => {
            console.log(err);
          });
          //
          this.storage.set('cliente', JSON.stringify(this.datos.data));
          this.storage.set('id', this.datos.data.id);
          this.storage.set('nombre', this.datos.data.nombre);
          this.storage.set('apellido',this.datos.data.apellido); 
          this.storage.set('correo',this.datos.data.correo);
          this.storage.set('direccion',this.datos.data.direccion);
          this.storage.set('telefono',this.datos.data.telefono);
          this.storage.set('fechaNacimiento',this.datos.data.fechaNacimiento);
          this.storage.set('sexo',this.datos.data.sexo);
          this.storage.set('urlFoto',this.datos.data.urlFoto);
          this.storage.set('documentoIdentidad',this.datos.data.documentoIdentidad);
          this.storage.set('rol_id',this.datos.data.rol.id);
          this.storage.set('rol',this.datos.data.rol.nombre);
          this.storage.set('token', this.datos.data.token);
          if (typeof this.idPromocion==="undefined"){
            this.loading.dismiss();
            this.route.navigate(['app/tabs']);
            this.emailFormControl.reset();
            this.passFormControl.reset();
          } else {
            this.loading.dismiss();
            this.router.navigate(['/create-equipment', { nombreServicio: this.nombreServicio, idServicio: this.idServicio, idTipoEquipo: this.idTipoEquipo}], {queryParams: { idPromocion: this.idPromocion, nombrePromocion: this.nombrePromocion} });
            this.emailFormControl.reset();
            this.passFormControl.reset();
          }
       

        }if(this.datos.status==true && this.datos.data.rol.tipoRol=='tecnico'){
           //metodo que hace que se le envie a la BD el id del dispositivo del cliente
           const datos = new FormData();
           datos.append('mobilePlayerId',this.notiID);
           this.services.putFormDataSingle(datos,'empleado/'+this.datos.data.id).then((result) => {
             console.log('el id es', this.notiID)
           }, (err) => {
             console.log(err);
           });
           //
          this.storage.set('tecnico', JSON.stringify(this.datos.data));
          this.storage.set('id', this.datos.data.id);
          this.storage.set('nombre', this.datos.data.nombre);
          this.storage.set('apellido',this.datos.data.apellido);
          this.storage.set('correo',this.datos.data.correo);
          this.storage.set('direccion',this.datos.data.direccion);
          this.storage.set('telefono',this.datos.data.telefono);
          this.storage.set('fechaNacimiento',this.datos.data.fechaNacimiento);
          this.storage.set('sexo',this.datos.data.sexo);
          this.storage.set('urlFoto',this.datos.data.urlFoto);
          this.storage.set('documentoIdentidad',this.datos.data.documentoIdentidad);
          this.storage.set('rol_id',this.datos.data.rol.id);
          this.storage.set('rol',this.datos.data.rol.nombre);
          this.storage.set('token', this.datos.data.token);
          this.loading.dismiss();
          this.route.navigate(['app1/tab-technical']);
          this.emailFormControl.reset();
          this.passFormControl.reset();
        }
        if(this.datos.status==false){
          console.log('ERROR');
          this.storage.clear();
          this.loading.dismiss();
          let toast = await this.toastCtrl.create({
            message: 'Correo o contraseña invalido',
            duration: 6000,
            color: 'danger',
            showCloseButton: true,
            closeButtonText: 'X',
          });
       await toast.present();
      
      }
       

        else{
          this.usuarioValido = true;
        }
      }, (err) => {
       
      });


}else{
  this.storage.clear();
  this.loading.dismiss();
  let toast = await this.toastCtrl.create({
    message: 'Compruebe que los datos son correctos o que todos los campos estén llenos',
    duration: 6000,
    color: 'danger',
    showCloseButton: true,
    closeButtonText: 'X',
  });
await toast.present();

}

  }
  ngOnInit() {
    this.notiID=this.pushService.userId;
    this.rutaActiva.queryParams.subscribe(params => {
      this.idPromocion = params["idPromocion"];
      this.nombrePromocion = params["nombrePromocion"];
      this.nombreServicio=params["nombreServicio"];
      this.idServicio = params["idServicio"];
      this.idTipoEquipo=params["idTipoEquipo"];
console.log(this.nombrePromocion)
    });
  }
 
  getInfo() {
    this.services.getAll('empresa').then((val) =>  {
      this.info = val.data;
    })
  }

 //doLogin(email) {

   // if (email === 'cliente') {

     // this.route.navigate(['app/tabs']);}
    //if (email === 'tecnico') {
      //this.route.navigate(['app1/tab-technical']);
    //}

  //}
 
}