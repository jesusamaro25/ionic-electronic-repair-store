import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Storage } from "@ionic/storage";
import { User } from "src/app/clases/user";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ToastController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ServicesService } from "src/app/services/services.service";
import { ActionSheetController } from "@ionic/angular";
import { Skills } from "src/app/clases/skills";

declare var window: any;

@Component({
  selector: "app-profile-technical-edit",
  templateUrl: "./profile-technical-edit.page.html",
  styleUrls: ["./profile-technical-edit.page.scss"]
})
export class ProfileTechnicalEditPage implements OnInit {
  image: string;
  usuario: User = new User();
  capturedSnapURL: string;
  editTechnicalGroup: FormGroup;
  skill: Array<Skills> = [];
  skillAll: Array<Skills> = [];

  constructor(
    private camera: Camera,
    public storage: Storage,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private services: ServicesService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage.get("tecnico").then(val => {
      this.usuario = JSON.parse(val);
      let id = this.usuario.id;
      this.services.getAll("empleado/" + id + "/especialidad").then(
        res => {
          this.skill = res.data;
        },
        err => {
          console.log(err);
        }
      );
    });

    this.services.getAll("catalogoservicio").then(
      res => {
        this.skillAll = res.data;
      },
      err => {
        console.log(err);
      }
    );

    this.editTechnicalGroup = this.formBuilder.group({
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

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async onSubmit() {
    if (this.editTechnicalGroup.valid) {
      const data = {
        documentoIdentidad: this.editTechnicalGroup.get("dni").value,
        correo: this.editTechnicalGroup.get("email").value,
        direccion: this.editTechnicalGroup.get("address").value,
        telefono: this.editTechnicalGroup.get("phone").value
      };

      const photo = new FormData();

      photo.append("foto", this.image);
      photo.append(
        "documentoIdentidad",
        this.editTechnicalGroup.get("dni").value
      );
      photo.append(
        "correo",
        this.editTechnicalGroup.get("email").value
      );

      photo.append(
        "direccion",
        this.editTechnicalGroup.get("address").value
      );
      photo.append(
        "telefono",
        this.editTechnicalGroup.get("phone").value
      );

      let specialities = {
        catalogoServicio: this.skill.map(x => x.id)
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
              if (typeof this.image=="undefined"){
                this.services.putFormDataSingle(data, "empleado/" + id);
                this.services.createFormData(
                  specialities,
                  "empleado/" + id + "/setEspecialidad"
                );
                this.toastMessage();
                err => {
                  console.log(err);
                };
              }
              else {
  //Para actualizar foto de perfil.
  this.services.putFormDataSingle(photo, "empleado/" + id);
  this.services.createFormData(
    specialities,
    "empleado/" + id + "/setEspecialidad"
  );
  this.toastMessage();
  err => {
    console.log(err);
  };
              }
             console.log('esto es la foto',this.image)
            
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
    this.router.navigate(["/profile-technical"]);
  }
  doRefresh(event){
  
    this.services.getAll('empleado/' + this.usuario.id) 
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
