import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: "app-rate-service",
  templateUrl: "./rate-service.page.html",
  styleUrls: ["./rate-service.page.scss"]
})
export class RateServicePage implements OnInit {
  @Output() rattingChange: EventEmitter<number> = new EventEmitter();

  rateServiceGroup: FormGroup;
  item: FormArray;
  resultado:any;
  preguntas:any = [];
  datos:any;
  resp: any[]=[];
  res: {};
  response:any;

  constructor(
    public toastCtrl: ToastController,
    private services: ServicesService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  getResponse(){
    this.services.getAll('mensaje/2').then((val) => {
      this.response = val.data.descripcion;
      console.log(this.response);
    })
  }
  ngOnInit() {
this.getResponse();
    this.rateServiceGroup = this.formBuilder.group({
      stars: new FormControl("", Validators.required),
      items: this.formBuilder.array([]),
      comments: new FormControl("", [
        Validators.pattern("^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ¡¿!?,.;]+$"),
        Validators.required
      ])
    });

    this.services.getAll('preguntaCalificacion').then((result) => {
      this.resultado = result.data;
      for (let i = 0; i < this.resultado.length; i++) {
        this.datos = {
          id: this.resultado[i].id,
          pregunta: this.resultado[i].descripcion
        };
        this.preguntas.push(this.datos);
      }

      for(var i=0;i<this.preguntas.length; i++){

        this.item = this.rateServiceGroup.get("items") as FormArray;
  
        this.item.push(
          this.formBuilder.group({
            id: this.preguntas[i].id,
            question: this.preguntas[i].pregunta,
            answer: ['', Validators.required]
          })
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  get items() {
    return this.rateServiceGroup.get("items") as FormArray;
  }

  async presentContact() {

    let id = this.route.snapshot.paramMap.get("id");

    for (var i = 0; i < this.preguntas.length; i++) {
      let array = this.rateServiceGroup.controls.items as FormArray;
      let group = array.at(i) as FormGroup;

      this.res = {
        "idPreguntaCalificacion": group.controls['id'].value,
        "respuesta": group.controls['answer'].value
      };
      this.resp.push(this.res);
    }

    const data = {
      "puntaje": this.rateServiceGroup.get('stars').value,
      "comentario":this.rateServiceGroup.get('comments').value,
      "preguntas": this.resp
    };

    if (this.rateServiceGroup.valid) {
      const alert = await this.alertCtrl.create({
        header: "Alerta",
        message: "¿Está seguro de calificar nuestro servicio?",
        buttons: [
          {
            text: "Cancelar",

            cssClass: "secondary",
            handler: () => {
              //this.router.navigate(['/rate']);
            }
          },
          {
            text: "Aceptar",
            cssClass: "secondary",
            handler: () => {
              this.services.createFormData(data,'ordenServicio/'+ id +'/calificacionServicio').then((r) =>
              {
                this.alertMessage();
              },
              (err) => {
                console.log(err);
              })
              this.rateServiceGroup.reset();
            }
          }
        ]
      });
      await alert.present();
    } else {
      console.log("Compruebe que todos los campos estén correctos.");
      let toast = await this.toastCtrl.create({
        message:
          "Compruebe que todos los campos estén correctos o estén completos.",
        duration: 6000,
        color: "danger",
        showCloseButton: true,
        closeButtonText: "X"
      });
      await toast.present();
    }
  }

  async alertMessage() {
    let toast = await this.toastCtrl.create({
      message: this.response,
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });
    await toast.present();
    this.router.navigate(["/rate"]);
  }

  onSubmit() {}
}
