import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ServicesService } from 'src/app/services/services.service';
import { Pleasure } from 'src/app/clases/pleasures';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/clases/user'
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: "app-modal-info",
  templateUrl: "./modal-info.page.html",
  styleUrls: ["./modal-info.page.scss"]
})
export class ModalInfoPage implements OnInit {
  pleasure: Array < Pleasure > = [];
  pleasureAll: Array < Pleasure > = [];
  job: Array < Pleasure > = [];
  jobAll: Array < Pleasure > = [];
  usuario: User = new User();
  response:any;
  constructor(
    private modalCtrl: ModalController, private services: ServicesService, private storage: Storage, 
    private toastCtrl: ToastController, private router: Router, private alertCtrl: AlertController) {}

    getResponse(){
      this.services.getAll('mensaje/1').then((val) => {
        this.response = val.data.descripcion;
        console.log(this.response);
      })
    }
  ngOnInit() {
    this.getResponse();
    console.log(this.response);
    this.storage.get('cliente').then((val) => {
      this.usuario = JSON.parse(val);
      console.log(this.usuario);

      let id = this.usuario.id;
      this.services.getAll('cliente/' + id + '/caracteristicasCliente').then((res) => {
        this.pleasure = res.data.filter( r => {
          return r.tipoCaracteristicaCliente.nombre === 'Gustos'
        });

        console.log(this.pleasure);
        this.job = res.data.filter( r => {
          return r.tipoCaracteristicaCliente.nombre === 'Ocupación'
        });
      }, (err) => {
        console.log(err);
      });
    });

    this.services.getAll('CaracteristicaCliente').then((res) => {
      this.pleasureAll = res.data.filter( r => {
        return r.tipoCaracteristicaCliente.nombre === 'Gustos'});

        console.log(this.pleasureAll);
        this.jobAll = res.data.filter(r => {
           return r.tipoCaracteristicaCliente.nombre === 'Ocupación'});
    }, (err => {
      console.log(err);
    }));
  }

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async salirModal() {
    let auxP = this.pleasure.map(x => x.id);

    let auxJ = this.job.map(x => x.id);

    let characteristics = {
      "caracteristicasCliente": [...auxP,...auxJ]
    };

    let id = this.usuario.id;
      
    const alert = await this.alertCtrl.create({
      header: "Alerta",
      message: "¿Está seguro de guardar los cambios?",
      buttons: [
        {
          text: "Cancelar",
          cssClass: "secondary",
          handler: () => {
          }
        },
        {
          text: "Aceptar",
          cssClass: "secondary",
          handler: () => {
            this.services.createFormData(characteristics,'cliente/'+ id + '/setCaracteristicasCliente');
            this.toastMessage();
            this.modalCtrl.dismiss();
            (err) => {
              console.log(err);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async toastMessage() {
    let toast = await this.toastCtrl.create({
      message: `Se han añadido exitosamente sus datos.`,
      duration: 6000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'X',
    });
    toast.present();
    this.router.navigate(['/create-service']);
  }
}
