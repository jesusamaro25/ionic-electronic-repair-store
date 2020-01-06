import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BudgetsService } from "src/app/services/budgets.service";
import { Budget } from "src/app/clases/budget";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ServicesService } from "src/app/services/services.service";
import { AlertController, ToastController } from "@ionic/angular";
//PASO 14: importamos ServicesService
@Component({
  selector: "app-budget-form",
  templateUrl: "./budget-form.page.html",
  styleUrls: ["./budget-form.page.scss"]
})
export class BudgetFormPage implements OnInit {
  //PASO 15: Declaramos las variables necesarias, en este caso YO no cree ninguna porque ya estaba declarado todo lo que necesitaba, luego hay que instanciar el servicio en el constructor como lo hemos venido trabajando

  arrayAct: any[] = [];
  actGroup: FormGroup;
  result: any;
  datos: any;

  actividades: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private services: ServicesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.actGroup = this.formBuilder.group({});
  }
  /*Paso 16: acá tenia que cargar las actividades que son posibles de realizar en un catalogo de servicio en especifico,
es por eso que en el ng on init creo que este método. Ojo, no será muy usado en el resto de la app, sugiero que vean otro ejemplo,
pero en dado caso que les toque usar algo parecido.. acá tienen.
*/
  ngOnInit() {
    // let id= this.route.snapshot.paramMap.get('id')
    let idcat = this.route.snapshot.paramMap.get("idcat");
    this.services
      .getAll("catalogoservicio/" + idcat) //services es la instancia de ServicesService
      .then(
        data => {
          console.log("esta es la data", data);
          this.result = data.data;
          for (let i = 0; i < this.result.actividades.length; i++) {
            //recorro las actividades y guardo el id y nombre para luego almacenarlos en el array de actividades
            this.datos = {
              id: this.result.actividades[i].id,
              name: this.result.actividades[i].nombre,
              costo: this.result.actividades[i].costo
            };
            this.actividades.push(this.datos);
          }
          console.log("estas son las acts", this.actividades);
        },
        err => {
          console.log(err);
        }
      );
  }
  //paso 17 metodo que hace el post de la generacion del presupuesto
  async submit() {
    if (this.arrayAct.length != 0) {
      this.presentContact();
    } else {
      let toast = await this.toastCtrl.create({
        message:
          "Compruebe que los datos son correctos o que todos los campos estén llenos",
        duration: 6000,
        showCloseButton: true,
        closeButtonText: "X",
        color: "danger"
      });
      await toast.present();
    }
  }

  guardarActividades(id) {
    var index = this.arrayAct.indexOf(id);
    if (index == -1) {
      this.arrayAct.push(id); // agregar al array de elementos seleccionados
    } else {
      this.arrayAct.splice(index, 1); // quitar del array de elementos seleccionados.
    }
    return this.arrayAct;
  }

  async presentContact() {
    const alert = await this.alertCtrl.create({
      message: "¿Desea generar el presupuesto?",
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
            this.message();
            this.router.navigate(["/app1/tab-technical/generate-budget"]);
          }
        }
      ]
    });
    //paso 17: llamo al metodo que hace la revision en la alerta

    await alert.present();
  }

  async message() {
    let toast = await this.toastCtrl.create({
      message: "Presupuesto generado",
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });

    toast.present();
    this.method();
  }

  method() {
    let id = this.route.snapshot.paramMap.get("id");
    const datos = {
      //guardo lo que necesito enviar en una sola variable por comodidad
      //  "presupuesto":this.actGroup.value.costo,
      actividades: this.arrayAct
    };
    console.log(
      datos,
      "solicitudServicio/" + id + "/generarPresupuesto"
    ); /*yo lo que hago es que antes de enviar un metodo
     post a la bd, hago el console log de lo que quiero enviar, de tal manera me garantizo que estoy enviando lo que quiero
     y asi enbasuro lo menos posible la bd. O sea sugiero que copien y peguen, adapten a sus necesidades, luego comenten todas
     las lineas del post, o sea todas las lineas despues de estas, y hagan el console log. Luego de ver que todo esta bien, ahi si 
     hacen el metodo post
     */
    this.services
      .createFormData(datos, "solicitudServicio/" + id + "/generarPresupuesto")
      .then(
        result => {},
        err => {
          console.log(err);
        }
      );
  }
}
