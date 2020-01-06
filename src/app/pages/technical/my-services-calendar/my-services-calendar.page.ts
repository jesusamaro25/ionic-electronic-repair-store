import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HomeworkService } from 'src/app/services/homework.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-my-services-calendar',
  templateUrl: './my-services-calendar.page.html',
  styleUrls: ['./my-services-calendar.page.scss'],
})
export class MyServicesCalendarPage implements OnInit {
showActs=false;
option: any[] = [];
findText = '';
techId:any=+this.route.snapshot.paramMap.get('techId');
nombreOpcion = "";
idServicio:any=+this.route.snapshot.paramMap.get('id');
dateGroup: FormGroup;
bloqueHora = false;
fecha: any;
hora: "";
metodo="bloquehorario";
//idtecnico:any;
bloquehora: any[] = [];
resultado: any[] = [];
//horaid:any;
//booltec: boolean;
today = moment().format('YYYY-MM-DD');
todayplusyear =  moment().add(1, 'years').format('YYYY-MM-DD'); 



  constructor(private route: ActivatedRoute, private toastCtrl: ToastController,public alertCtrl: AlertController, public options: HomeworkService, private router: Router , private formBuilder: FormBuilder, private services: ServicesService) { 

  this.dateGroup =this.formBuilder.group({
    option: ['', Validators.required],
    //comentario: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    //tecnico: ['', Validators.required]

  })
  //this.booltec=false;
}
  ngOnInit() { 
    this.loadActs(); 
    this.loadHours();
    console.log(this.idServicio)
  }

  loadActs() {
   // this.idtipoequipo = this.rutaActiva.snapshot.params.idTipoEquipo;
    
    //console.log('donaiayudameporfavor',this.marca);
   // this.services.getAll('ordenServicio/'+this.idtipoequipo+'/marcas')
      this.services.getAll('ordenServicio/'+this.idServicio+'/actividadesPorAgendar')
     .then(data => {
       console.log(data);
       this.option=data.data;
       if (this.option.length==0){
      this.showActs=true;
       }
     }, err => {
       console.log(err);
     }); 
  }

  generarLink() { 
   
 
    this.nombreOpcion = this.dateGroup.value.option.id;

  }
  generarRuta() {
    this.fecha = this.transform();
    this.hora = this.dateGroup.value.hora.id;
    //this.horaid = this.dateGroup.value.hora.id;
  }


  mostrarHora() {
    this.bloqueHora = true;
  }
  transform(): any {
    this.fecha = this.dateGroup.value.fecha;
    return moment(this.fecha).format('DD-MM-YYYY');
   
  }

  loadHours() {
    this.services.getAll(this.metodo)
   .then(data => {
     this.bloquehora=data.data;
     
   }, err => {
     console.log(err);
   }); 
  }
  /*buscarTecnico(){

    if(this.dateGroup.get('fecha').value!="" && this.dateGroup.get('hora').value!="" ){

      this.horaid = this.dateGroup.value.hora.id;
      this.fecha = this.transform();
      console.log('agenda/tecnicosDisponibles?idBloqueHorario='+this.horaid+'&idCatalogoServicio='+this.idServicio+'&fecha='+this.fecha);
      this.services.getAll('agenda/tecnicosDisponibles?idBloqueHorario='+this.horaid+'&idCatalogoServicio='+this.idServicio+'&fecha='+this.fecha).then((data) => {
        console.log({ data });
        this.resultado = data.data;
        console.log(this.resultado);
       if (this.resultado.length>0) {
        this.dateGroup.get('tecnico').setValue(this.resultado[0].id);
  

        }
        this.booltec=true;
        this.idtecnico= this.dateGroup.get('tecnico').value;
      }, (err) => {
        console.log(err);
      });
      

    }
  }*/

  crearSolicitud(){
   
    const datos = new FormData();
     datos.append('idUsuario',this.techId);
     datos.append('idBloqueHorario',this.hora); /////
     datos.append('fechaActividad',this.fecha); //////////
     datos.append('idActividad',this.nombreOpcion);
     datos.append('idOrdenServicio',this.idServicio);
     console.log(this.fecha);
 
     //inspeccionar lo que imprime form data por consola
     for (var key in datos) {
       console.log('la solicitud es',key, datos[key]);
     }
 this.services.createFormData(datos,'agenda').then((result:any) => {
  if (result.status) {
    this.alertMessage();
    this.router.navigate(['/my-services']);
  }
  else {
this.errorMessage();
  }
     }, (err) => {
       console.log(err);
     });
     
   }
 


  async alertSendSol() 
  {
    console.log(this.dateGroup.value);
    if(this.dateGroup.valid){
      
   const alert = await this.alertCtrl.create(
    {
      header: 'Mensaje',
      message: '¿Desea reagendar?',
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
            }
          }
      ]
    });
 
    await alert.present();

    }else{
    
        let toast = await this.toastCtrl.create({
          message: 'Por favor, verifique que los campos estén completos o sean correctos',
          duration: 6000,
          color: 'danger',
          showCloseButton: true,
          closeButtonText: 'X'
        });
     await toast.present();
    // this.router.navigate(['/my-services-schedule']);
    }
 }
 
  async alertCancelSol() 
  {
   const alert = await this.alertCtrl.create(
   {
     header: 'Mensaje',
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
          this.alertMessages();
          console.log('tipo:',this.options);
          console.log('Agenda cancelada');
           //this.router.navigate(['/app1/tab-technical']);
           }
         }
     ]
   });
await alert.present();
 }
 
 async alertMessage() 
  {
  
    let toast = await this.toastCtrl.create({
      message: 'Agenda ha sido enviada',
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X'
    });
  await toast.present();
 }
 async alertMessages() 
  {
   
    let toast = await this.toastCtrl.create({
      message: 'Agenda ha sido rechazada',
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X'
    });
    this.router.navigate(['/my-services']);
  await toast.present();
  
 }
 async errorMessage(){
  let toast = await this.toastCtrl.create({
    message: 'Error, no se pudo completar la solicitud porque ya está ocupado el técnico en la hora seleccionada, por favor intente con otra fecha',
    duration: 6000,
    showCloseButton: true,
    closeButtonText: 'X',
    color: 'danger'
  });
  await toast.present();
}
 
}





