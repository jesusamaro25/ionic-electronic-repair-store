import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import {User} from 'src/app/clases/user'
import { ServicesService } from 'src/app/services/services.service';
import { Pleasure } from 'src/app/clases/pleasures';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.page.html',
  styleUrls: ['./profile-client.page.scss'],
})
export class ProfileClientPage implements OnInit {
  usuario: User= new User();

  plea: Array < Pleasure > = [];
  job = [];

  constructor(public navCtrl: NavController, private storage: Storage, private route:ActivatedRoute,
              private services: ServicesService) { }

  ngOnInit() {
    
    
  }
  ionViewDidEnter(){
    this.storage.get('cliente').then((val) => {
      this.usuario=JSON.parse(val);
      
      let id = this.usuario.id;
      this.services.getAll('cliente/' + id + '/caracteristicasCliente').then((res) => {
        this.plea = res.data.filter( r => {
          return r.tipoCaracteristicaCliente.nombre === 'Gustos'
        });
        this.job = res.data.filter( r => {
          return r.tipoCaracteristicaCliente.nombre === 'Ocupación'
        });
      }, (err) => {
        console.log(err);
      });
      this.findSex();
    });  

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
  ionViewDidLeave(){
     this.plea = [];
     this.job=[];
 }
 
  findSex(){
    if (this.usuario.sexo=="H")
    {
    this.usuario.sexo= "Hombre"; 
    }
    else 
    {
      this.usuario.sexo= "Mujer"; 
    }
  }

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  
 /* goTo() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          usuario: JSON.stringify(this.usuario)
      }
  };
  this.navCtrl.navigateForward(['profile-client-edit'],navigationExtras);
  
  }*/

}
