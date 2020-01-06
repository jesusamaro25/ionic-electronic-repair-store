import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Storage } from "@ionic/storage";
import { User } from "src/app/clases/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastController, AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { ServicesService } from "src/app/services/services.service";
import { Pleasure } from "src/app/clases/pleasures";

declare var window: any;

@Component({
  selector: "app-profile-client-edit",
  templateUrl: "./profile-client-edit.page.html",
  styleUrls: ["./profile-client-edit.page.scss"]
})
export class ProfileClientEditPage implements OnInit {
  image: string;
  usuario: User = new User();
  capturedSnapURL: string;
  pleasure: Array<Pleasure> = [];
  pleasureAll: Array<Pleasure> = [];
  job: Array<Pleasure> = [];
  jobAll: Array<Pleasure> = [];
  imageData: any;
  clientEditGroup: FormGroup;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private camera: Camera,
    private storage: Storage,
    private toastCtrl: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private services: ServicesService,
    private route: ActivatedRoute
  ) {
    this.clientEditGroup = new FormGroup({
      email: new FormControl("", (Validators.required, Validators.email)),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      dni: new FormControl("", [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern("^[0-9]*$")
      ])
    });
  }

  ngOnInit() {
    /* this.route.queryParams.subscribe(params => {
      // console.log('Pepperoni', params);
        this.user = JSON.parse(params.usuario);
        console.log(this.user.nombre);
        this.usuarioprueba=this.user.nombre;

    });
  */
    this.storage.get("cliente").then(val => {
      this.usuario = JSON.parse(val);
      let id = this.usuario.id;
      this.services.getAll("cliente/" + id + "/caracteristicasCliente").then(
        res => {
          this.pleasure = res.data.filter(r => {
            return r.tipoCaracteristicaCliente.nombre === "Gustos";
          });
          this.job = res.data.filter(r => {
            return r.tipoCaracteristicaCliente.nombre === "Ocupación";
          });
        },
        err => {
          console.log(err);
        }
      );
    });

    this.services.getAll("CaracteristicaCliente").then(
      res => {
        this.pleasureAll = res.data.filter(r => {
          return r.tipoCaracteristicaCliente.nombre === "Gustos";
        });
        this.jobAll = res.data.filter(r => {
          return r.tipoCaracteristicaCliente.nombre === "Ocupación";
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):

        //  const img = window.Ionic.WebView.convertFileSrc( imageData );
        //console.log(img)
        // this.postsService.subirImagen( imageData );
        //  this.tempImages.push( img );

        this.image = `data:image/jpeg;base64,${imageData}`;
      },
      err => {
        // Handle error
      }
    );
  }

  async onSubmit() {
    if (this.clientEditGroup.valid) {
      const data = {
        documentoIdentidad: this.clientEditGroup.get("dni").value,
        correo: this.clientEditGroup.get("email").value,
        direccion: this.clientEditGroup.get("address").value,
        telefono: this.clientEditGroup.get("phone").value
      };

      const photo = new FormData();
      photo.append("foto", this.image);

      let auxP = this.pleasure.map(x => x.id);

      let auxJ = this.job.map(x => x.id);

      let characteristics = {
        caracteristicasCliente: [...auxP, ...auxJ]
      };

      let id = this.usuario.id;

      const alert = await this.alertCtrl.create({
        header: "Alerta",
        message: "¿Está seguro de guardar los cambios?",
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
              if (typeof this.image == "undefined") {
                this.services.putFormDataSingle(data, "cliente/" + id);
                this.services.createFormData(
                  characteristics,
                  "cliente/" + id + "/setCaracteristicasCliente"
                );
                this.toastMessage();
                err => {
                  console.log(err);
                };
              } else {
                //Para actualizar foto de perfil.
                this.services.putFormDataSingle(photo, "cliente/" + id);
                this.services.createFormData(
                  characteristics,
                  "cliente/" + id + "/setCaracteristicasCliente"
                );
                this.toastMessage();
                err => {
                  console.log(err);
                };
              }
            }
          }
        ]
      });
      await alert.present();
    } else {
      let toast = await this.toastCtrl.create({
        message: `Compruebe que ha llenado todos los datos.`,
        duration: 6000,
        color: "dark",
        showCloseButton: true,
        closeButtonText: "X"
      });
      toast.present();
    }
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Foto de perfil",
      buttons: [
        {
          text: "Desde la cámara",
          handler: () => {
            console.log("¡Clickeaste cámara!");
            this.camara();
          }
        },
        {
          text: "Desde la galería",
          handler: () => {
            console.log("¡Clickeaste galería!");
            this.libreria();
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("¡Clickeaste cancelar!");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async toastMessage() {
    let toast = await this.toastCtrl.create({
      message: `Se han cambiado exitosamente sus datos.`,
      duration: 6000,
      color: "dark",
      showCloseButton: true,
      closeButtonText: "X"
    });
    toast.present();
    this.router.navigate(["/profile-client"]);
  }
  doRefresh(event){
  
    this.services.getAll('cliente/' + this.usuario.id) 
    .then(data => {
      this.usuario.documentoIdentidad=data.data.documentoIdentidad;
      this.usuario.direccion=data.data.direccion;
      this.usuario.telefono=data.data.telefono;
      this.usuario.correo=data.data.correo;
      this.usuario.urlFoto=data.data.urlFoto;
      event.target.complete();
    }, err => {
      console.log(err);
    }); 
   
 }
}
