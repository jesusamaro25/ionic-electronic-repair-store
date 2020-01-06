import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'; 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  token:any=this.storage.get("tecnico");
  usuario:any=this.storage.get("token");
  constructor(public alertCtrl: AlertController, private router: Router, private storage: Storage) { }

  ngOnInit() {}

  async alertLogout() 
   {
    const alert = await this.alertCtrl.create(
    {
      header: 'Alerta',
      message: '¿Desea cerrar sesión?',
     buttons: [
         {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            
            //this.router.navigate(['components/menu']);
            }
          },
          {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
           this.storage.clear();  
           this.usuario=null;
            this.token=null;

           

            this.router.navigate(['login']);
            }
          }
      ]
    });

    await alert.present();
  }

}