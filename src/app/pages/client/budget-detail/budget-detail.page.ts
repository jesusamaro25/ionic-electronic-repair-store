import { Component, OnInit, Input, ErrorHandler } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
//import { Activity } from 'src/app/clases/activity';
//import { BudgetService } from 'src/app/services/budget.services';
//import { ActivityService } from 'src/app/services/activity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service'

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.page.html',
  styleUrls: ['./budget-detail.page.scss'],
})
export class BudgetDetailPage implements OnInit {
  budget: any[] = [];
  activity: any[] = [];
  estatus: any;
  buttons: boolean=true;
  total:number;
  promocion:any;
  motive: any[] = [];
  
  constructor(public toastCtrl: ToastController , private router: Router, public alertCtrl: AlertController, private services: ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
   // this.getBudDetail();
    this.getActivityDetail();
  this.getDetail();
  this.loadMotives();
  }

  loadMotives() {
    this.services.getAll('motivoRechazo/tiporechazo/Presupuesto')
   .then(data => {
     this.motive=data.data;
     console.log('estos son los motivos', this.motive);
   }, err => {
     console.log(err);
   }); 
  }
  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail('solicitudServicio', id)
        .then( data => {
          this.budget=Array.of(data.data);
          console.log(this.budget);
          console.log('se canso', data.data.promocion.id);
          console.log('promo', Array.of(data.data.promocion));
          const reparacion=data.data.presupuesto;
          const revision=data.data.revision.costo;
          const descuento=(data.data.promocion.descuento.porcentaje)/100;
          if (typeof data.data.promocion.id==="undefined"){
            this.promocion= "No aplica";
            this.total= (reparacion+revision);
          }
          else{
            this.promocion=((reparacion+revision)*descuento);
            this.total= (reparacion+revision) - ((reparacion+revision)*descuento);
          }
          if (data.data.estatusPresupuesto=="R"){
            this.estatus= "Rechazado"; 
            this.buttons=false;
          }
            else 
            if (data.data.estatusPresupuesto=="A") {
              this.estatus= "Aprobado"; 
              this.buttons=false;
            }
            else
            this.estatus= "Esperando respuesta"; 

          //console.log(this.idTipoEquipo);
         // console.log('esto es lo que almaceno',this.budget);
        }, err => {
          console.log(err);
        }); 
      
  }

 /* getBudDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.budS.getBudgetDetail(id)
        .subscribe( budS => {
          console.log( budS );
          this.bud= budS;
      });
    }*/
      getActivityDetail(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.services.getDetail('ordenServicio/', id)
        .then( data => {
          this.activity=data.data.actividades;
          //console.log(this.idTipoEquipo);
        }, err => {
          console.log(err);
        }); 
  }
  async alertSendSol() 
  {
   const alert = await this.alertCtrl.create(
   {
     header: 'Mensaje',
     message: '¿Está seguro de aceptar el presupuesto?',
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
           this.alertMessage();
           this.aprove();
          
           }
         }
     ]
   });

   await alert.present();
 }

 	 //Alerta que se muestra cuando se cansela el presupuesto
   //el input tiene un name que me ayuda a controlar el arreglo pudiendo conocer su valor		 
   //se crean tantos inputs (opciones de motivos) que existan y se guardan en el arreglo input
   //en el arreglo burrons uso la data del arreglo inputs		
  //en la alerta en inputs se pasa el arreglo input y así se permite el mostrar las opciones 
	 //en el Aceptar rechazo si el input esta vacio enviará un mensaje de error		 //al seleccionar un motivo y presionar aceptar, se guarda en data el Id del motivo
  
   async alertCancelSol() 
   {
     let input={check:[]};
     for (let i = 0; i < this.motive.length; i++) {
       input.check.push({name:"checkbox"+i,
                         type: 'checkbox',
                         label: this.motive[i].descripcion,
                         value: this.motive[i].id})
                       }
     console.log(input.check);
     const alert = await this.alertCtrl.create(
    {
      message: 'Por favor, seleccione un motivo',
      header: '¿Está seguro de rechazar el presupuesto?',
      inputs: input.check,
      buttons: [
         {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: (data) => {
            }
          },
          {
          text: 'Aceptar',
          cssClass: 'secondary',
          
          handler: (data) => {
           if(data.length < 1){
               this.alertMessages2();
           }
           else if(data.length > 1){
             this.alertMessages3();
           }
           else {
          this.alertMessages();
          this.reject(data);
          console.log('Motivo de rechazo con ID:',data);
            //this.router.navigate(['/app/tabs']);
            }
          }
         }
      ]
    });
 await alert.present();
  }

 async alertMessage(){
  let toast = await this.toastCtrl.create({
    message: 'Presupuesto aceptado',
    duration: 4000,
    color: 'dark',
    showCloseButton: true,
    closeButtonText: 'X',
  });
await toast.present();
this.router.navigate(['/budget']);
}

async alertMessages2() 
  {
    let toast = await this.toastCtrl.create({
      message: 'Debe seleccionar un motivo por el cual rechaza el presupuesto',
      duration: 4000,
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();

}
async alertMessages3() 
  {
    let toast = await this.toastCtrl.create({
      message: 'Por favor, debe seleccionar un (1) solo motivo',
      duration: 4000,
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();

}
 async alertMessages() 
  {
    let toast = await this.toastCtrl.create({
      message: 'Presupuesto rechazado',
      duration: 4000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X',
    });
  await toast.present();
  this.router.navigate(['/budget']);

}

aprove(){
  const id = +this.route.snapshot.paramMap.get('id');
        const post = new FormData(); //formdatavacio porque no necesita datos
        this.services.createFormData(post,'solicitudServicio/'+id+'/aceptarPresupuesto').then((result) => {
          console.log("el presupuesto fue aprobado");
        }, (err) => {
          console.log(err);
        });
}

reject(data){
  const id = +this.route.snapshot.paramMap.get('id');
        const post = new FormData();
        post.append('idMotivoRechazo',data);
        this.services.createFormData(post,'solicitudServicio/'+id+'/rechazarPresupuesto').then((result) => {
          console.log("el presupuesto fue rechazado");
        }, (err) => {
          console.log(err);
        });

      }

}
