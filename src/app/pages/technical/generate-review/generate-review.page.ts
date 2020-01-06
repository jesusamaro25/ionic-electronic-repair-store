import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//PASO 14: importamos ServicesService
import { ServicesService } from 'src/app/services/services.service'
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-generate-review',
  templateUrl: './generate-review.page.html',
  styleUrls: ['./generate-review.page.scss'],
})
export class GenerateReviewPage implements OnInit {
//data:any;
post1:any
  reviewGroup: FormGroup;
  diagnosticoReview="";
  costoReview="";
  estatusEquipo="";
  //se creo esta variable para controlar el campo descripción en pantalla en caso que el equipo no pueda ser reparable
  mostrarMotivo= false;
  //usado para almacenar el valor de la descripción del formControl
  descrip="";
minRange:any;
maxRange:any;
  costo: any[]=[];
  /*PASO 15: Declaramos las variables necesarias, en este caso YO no cree ninguna porque ya estaba declarado todo lo que necesitaba, luego hay que instanciar el servicio en el constructor como lo hemos venido trabajando.
  Acá tuve cuidado de cambiar el id a mayusculas porque a pesar de poner A y R, aun asi lo enviaba a la bd con minuscula, entonces,
  lo mejor es preguntar para asegurarse que se hará un buen trabajo
*/
  result: any[] = [
    {
      id: 'A'.toUpperCase(),
      nombre: 'Reparable'
    },
    {
      id: 'R'.toUpperCase(),
      nombre: 'No reparable'
    }
  ]
  
  motive: any[] = [];

//descripción no tiene Validators.required porque si el equipo es reparable ese atributo estará en blanco
  constructor(private router: Router, public alertCtrl: AlertController, private formBuilder: FormBuilder, private route: ActivatedRoute,private services: ServicesService,private toastCtrl: ToastController) { 
    this.reviewGroup = this.formBuilder.group({
      diagnostico: ['', Validators.required],
      costo: ['', Validators.required],
      resultado: ['', Validators.required],
      descripcion: ['']
    })
  }

  ngOnInit() {
  /*  this.route.queryParams.subscribe(params=>{
      console.log('params', params);
      if(params && params.request) {
        this.data=JSON.parse(params.request);
        console.log('data', this.data);

      }
    });*/
    this.loadRange();
    this.loadMotives();
  }
  loadMotives() {
    this.services.getAll('motivoRechazo/tiporechazo/Revision')
   .then(data => {
     this.motive=data.data;
     console.log('estos son los motivos', this.motive);
   }, err => {
     console.log(err);
   }); 
  }
  //Método creado para almacenar los valores existentes en el formBuilder que vienen desde el html
  //en el html es llamado antes de culminar con el proceso para lograr un almacenamiento efectivo, pensando en la sincronia de js
  generarLog(){
    this.diagnosticoReview = this.reviewGroup.value.diagnostico;
    this.costoReview = this.reviewGroup.value.costo;
    console.log(this.costoReview);

  }
  
  //método creado para activar el campo de descripción en caso que el equipo no sea reparable. 
  //el else es en caso que el técnico seleccione que no sea reparable por equivocación
  //método invocado desde el html
  //en el else de vuelve a dejar la descripción en vacio por si por error el cliente seleccionó el no reparable e ingreso algun valor
  generarMotivo(){
    
    if(this.reviewGroup.value.resultado == 'R'){
      this.mostrarMotivo = true;
    }else{
      this.mostrarMotivo = false;
    }
  }
  

  
//en el handler de Aceptar existe una validación
//en caso que el equipo no pueda ser reparable y el campo descripción del motivo esté vacio, se enviará un toast (message2) mencionando que debe completar el campo descripción
//caso contrario, que si sea reparable o que no sea reparable y si haya ingresado la descripción, si se permitirá terminar la revisión. 
  async presentContact() {
    const alert = await this.alertCtrl.create({
      
      message: '¿Desea finalizar la revisión?',
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
            if(this.reviewGroup.value.resultado == 'R' && this.reviewGroup.value.descripcion == ""){
              console.log('VALIDACIÓN');
              this.message2();
              } else if (parseFloat(this.costoReview) <parseFloat(this.minRange) || parseFloat(this.costoReview)> parseFloat(this.maxRange)){
this.message3();
              }
              else{
            this.message();         
              }
          }
        }
      ]
    });
//paso 17: llamo al metodo que hace la revision en la alerta
  await alert.present();
  }

async message(){
  let toast = await this.toastCtrl.create({
    message: `Revisión realizada`,
    duration: 6000,
    color: 'dark',
    showCloseButton: true,
    closeButtonText: 'X'
  });
  
  toast.present();
  this.createReview();
}


async message2(){
  let toast = await this.toastCtrl.create({
    message: `Debe completar todos los campos`,
    duration: 6000,
    color: 'danger',
    showCloseButton: true,
    closeButtonText: 'X'
  });
  
  toast.present();
}
async message3(){
  let toast = await this.toastCtrl.create({
    message: `El costo de la revisión no está en un rango válido, por favor intente de nuevo`,
    duration: 6000,
    color: 'danger',
    showCloseButton: true,
    closeButtonText: 'X'
  });
  
  toast.present();
}

//PASO16: metodo post que genera la revision
createReview(){
  let id=this.route.snapshot.paramMap.get('id'); //me traigo el id del servicio
 const datos = new FormData(); //en un formdata almaceno todo lo que necesito enviar. Esos console logs, son buenisimos para guiarse
 /*console.log('id_:',this.route.snapshot.paramMap.get('id'));
 console.log('Diagnistico:', this.reviewGroup.value.diagnostico);
 console.log('Costo:',this.reviewGroup.value.costo);
 console.log('Resultado diagnóstico:',this.reviewGroup.value.resultado);*/
 datos.append('costo',this.reviewGroup.value.costo);
 datos.append('diagnostico',this.reviewGroup.value.diagnostico);
 datos.append('estatusEquipo',this.reviewGroup.value.resultado);

const post= new FormData();
post.append('costo',this.reviewGroup.value.costo);
post.append('diagnostico',this.reviewGroup.value.diagnostico);
post.append('estatusEquipo',this.reviewGroup.value.resultado);
post.append('idMotivoRechazo',this.reviewGroup.value.descripcion.id);
this.post1 = {
  costo: this.reviewGroup.value.costo,
  diagnostico: this.reviewGroup.value.diagnostico,
  estatusEquipo:this.reviewGroup.value.resultado,
  idMotivoRechazo: this.reviewGroup.value.descripcion.id
}
 /*yo lo que hago es que antes de enviar un metodo
       post a la bd, hago el console log de lo que quiero enviar, de tal manera me garantizo que estoy enviando lo que quiero
       y asi enbasuro lo menos posible la bd. O sea sugiero que copien y peguen, adapten a sus necesidades, luego comenten todas
       las lineas del post, o sea todas las lineas despues de estas, y hagan el console log. Luego de ver que todo esta bien, ahi si 
       hacen el metodo post
       */
 if (this.reviewGroup.value.resultado=='A'){    
this.services.createFormData(datos,'solicitudServicio/'+id+'/revisar').then((result) => {
this.router.navigate(['revision']);
 }, (err) => {
   console.log(err);
 });
} 
else {
this.services.createFormData(post,'solicitudServicio/'+id+'/revisar').then((result) => {
this.router.navigate(['revision']);
 }, (err) => {
   console.log(err);
 });
 //console.log(this.post1);
}
}
  loadRange(){
    this.services.getAll('precio') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.costo = Array.of(data.data);
        this.minRange=data.data.precioMinimoRevision;
        this.maxRange=data.data.precioMaximoRevision
      }, err => {
        console.log("err");

      });
  }

}
