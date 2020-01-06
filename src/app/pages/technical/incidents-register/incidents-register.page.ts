import { Component, OnInit } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ServicesService } from "src/app/services/services.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-incidents-register",
  templateUrl: "./incidents-register.page.html",
  styleUrls: ["./incidents-register.page.scss"]
})
export class IncidentsRegisterPage implements OnInit {
  option: any[] = [];
  findText = "";
  todayplusyear =  moment().add(1, 'years').format('YYYY-MM-DD'); 
  idOption = "";
  mensaje = "";
  idTask:any=+this.route.snapshot.paramMap.get('id');
  idServicio: number;
  dateGroup: FormGroup;
  hour = false;
  comentario: string;
  fecha: Date;
  hora: "";
  metodo = "bloquehorario";
  bloquehora: any[] = [];
  types: any[] = [];
  resultado: any[] = [];
  today = moment().format("YYYY-MM-DD");

  constructor(
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private services: ServicesService,
    private route: ActivatedRoute
  ) {
    this.dateGroup = this.formBuilder.group({
      idTipoIncidencia: ["", Validators.required],
      descripcionIncidencia: ["", Validators.required],
      fechaActividad: ["", Validators.required],
      idBloqueHorario: ["", Validators.required]
      //tecnico: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.loadHours();
    this.loadTypes();
  }

  generarLink() {
    this.idOption = this.dateGroup.value.idTipoIncidencia.id;
    this.mensaje = this.dateGroup.value.descripcionIncidencia;
  }
  generarRuta() {
    this.fecha = this.transform();
    this.hora = this.dateGroup.value.idBloqueHorario.id;
  }

  find(event) {
    // console.log(event);
    this.findText = event.detail.value;
  }

  mostrarHora() {
    this.hour = true;
  }
  transform(): any {
    this.fecha = this.dateGroup.value.fechaActividad;
    return moment(this.fecha).format("DD-MM-YYYY");
  }

  loadHours() {
    this.services.getAll(this.metodo).then(
      data => {
        this.bloquehora = data.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  loadTypes() {
    this.services
      .getAll("tipoIncidencia")
      .then(data => {
        this.types = data.data;
      })
      .catch((err: any) => {
        console.error(err);
      });
  } 
   incidentsRegister() {
    this.dateGroup.patchValue({fechaActividad: moment(this.dateGroup.value.fechaActividad).format('DD-MM-YYYY')});
    const post = this.dateGroup.value;

    this.services.createFormData(post,'agenda/'+this.idTask+'/reagendar').then((result:any) => {
        if (result.status) {
          this.alertMessage();
          console.log('esto mando',post);
        } else {
          this.errorMessage();
          console.log('esto mando',post);
        }
      }).catch((err: any) => {
        console.error(err);
      })
    } 
  


  async alertSendSol() {
    console.log(this.dateGroup.value);
    if (this.dateGroup.valid) {
      const alert = await this.alertCtrl.create({
        header: "Mensaje",
        message: "¿Desea reagendar?",
        buttons: [
          {
            text: "Cancelar",
            cssClass: "secondary",
            handler: () => {
              //this.router.navigate(['']);
            }
          },
          {
            text: "Aceptar",
            cssClass: "secondary",
            handler: () => {
             this.incidentsRegister();
            }
          }
        ]
      });

      await alert.present();
    } else {
      let toast = await this.toastCtrl.create({
        message:
          "Por favor, verifique que los campos estén completos o sean correctos",
        duration: 6000,
        color: "danger",
        showCloseButton: true,
        closeButtonText: "X"
      });
      await toast.present();
    }
  }

  async alertCancelSol() {
    const alert = await this.alertCtrl.create({
      header: "Mensaje",
      message: "¿Está seguro de cancelar el proceso?",
      buttons: [
        {
          text: "Cancelar",
          cssClass: "secondary",
          handler: () => {
            //this.router.navigate(['/createend']);
          }
        },
        {
          text: "Aceptar",
          cssClass: "secondary",
          handler: () => {
            this.alertMessages();
          }
        }
      ]
    });
    await alert.present();
  }

  async alertMessage() {
    let toast = await this.toastCtrl.create({
      message: "Su reagenda ha sido enviada",
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });
    await toast.present();
    this.router.navigate(["/my-services"]);
  }
  async alertMessages() {
    let toast = await this.toastCtrl.create({
      message: "El proceso ha sido cancelado",
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });
    this.router.navigate(["/my-services"]);
    await toast.present();
  }

async errorMessage() {
  let toast = await this.toastCtrl.create({
    message: "Error, no se pudo completar la solicitud porque ya está ocupado el técnico en la hora seleccionada, por favor intente con otra fecha",
    duration: 6000,
    color: "danger",
    showCloseButton: true,
    closeButtonText: "X"
  });
  await toast.present();
}
}
