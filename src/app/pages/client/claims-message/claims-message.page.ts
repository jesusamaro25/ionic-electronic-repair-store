import { Component, OnInit } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";
import { ServicesService } from "src/app/services/services.service";
import * as moment from 'moment';

@Component({
  selector: "app-claims-message",
  templateUrl: "./claims-message.page.html",
  styleUrls: ["./claims-message.page.scss"]
})
export class ClaimsMessagePage implements OnInit {
  option: any[] = [];
  techId: any = +this.route.snapshot.paramMap.get("techId");
  bloqueHora = false;
  bloquehora: any[] = [];
  fecha: any;
  hora: "";
  resultado: any[] = [];
  today = moment().format('YYYY-MM-DD');
  todayplusyear =  moment().add(1, 'years').format('YYYY-MM-DD'); 
  serviceGroup: FormGroup;
  nombreOpcion = "";
  constructor(
    private service: ServicesService,
    public toastCtrl: ToastController,
    public claimsmessageCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.serviceGroup =this.formBuilder.group({
      option: ['', Validators.required],
      //comentario: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      //tecnico: ['', Validators.required]
  
    });
    //this.booltec=false;
  }

  ngOnInit() {
    this.loadMotives();
    this.loadHours();
  }
  loadMotives() {
    this.service.getAll("tipoReclamo").then(
      data => {
        this.option = data.data;
        console.log(this.option);
      },
      err => {
        console.log(err);
      }
    );
  }
  generarLink() {
    this.nombreOpcion = this.serviceGroup.value.option.id;
  }
  generarRuta() {
    this.fecha = this.transform();
    this.hora = this.serviceGroup.value.hora.id;
    //this.horaid = this.dateGroup.value.hora.id;
  }

  mostrarHora() {
    this.bloqueHora = true;
  }
  transform(): any {
    this.fecha = this.serviceGroup.value.fecha;
    return moment(this.fecha).format('DD-MM-YYYY');
   
  }
  loadHours() {
    this.service.getAll("bloquehorario")
   .then(data => {
     this.bloquehora=data.data;
     
   }, err => {
     console.log(err);
   }); 
  }

  create() {
    let id: any = +this.route.snapshot.paramMap.get("id");
    const datos = new FormData();
    datos.append("idTipoReclamo", this.serviceGroup.value.option.id);
    datos.append("idOrdenServicio", id);
    datos.append('idBloqueHorario',this.hora); 
    datos.append('fechaActividad',this.fecha);
    datos.append('idUsuario',this.techId);
    this.service.createFormData(datos, "reclamoServicio").then(async (result: any)=> {
        if (result.status) {
          this.alertMessage();
        }
        else {
this.errorMessage();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentContact() {
    const contacto = await this.claimsmessageCtrl.create({
      header: "Alerta",
      message: "¿Desea generar reclamo?",
      buttons: [
        {
          text: "Cancelar",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: "Aceptar",
          cssClass: "secondary",
          handler: () => {
            this.create();
            //this.router.navigate(['/app1/tab-technical/home-technical']);
          }
        }
      ]
    });
    await contacto.present();
  }

  async alertMessage() {
    let toast = await this.toastCtrl.create({
      header: "Solicitud enviada",
      message: "En las próximas horas nos estaremos comunicando con usted",
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });
    await toast.present();
    this.router.navigate(["/guarantee"]);
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
