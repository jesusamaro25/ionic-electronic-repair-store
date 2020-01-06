import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/clases/user'
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-profile-technical',
  templateUrl: './profile-technical.page.html',
  styleUrls: ['./profile-technical.page.scss'],
})
export class ProfileTechnicalPage implements OnInit {
  
  usuario: User= new User();
  especialidad: any;
  skills: any[] = [];
  userRefresh: any[] = [];

  constructor(private services: ServicesService, private storage: Storage, private service: ServicesService) { }

  ngOnInit() {
   
    
    }
    ionViewDidEnter(){
      this.storage.get('tecnico').then((val) => {
        this.usuario=JSON.parse(val);
        console.log(this.usuario);
        this.findSex();
        this.getSkills();
      });
    }
    ionViewDidLeave(){
      this.skills=[];
      console.log(this.usuario);
    }

    getSkills(){
      this.service.getAll('empleado/'+this.usuario.id+'/especialidad').then((val) => {
        this.skills = val.data;
      });
    }

  findSex()
  {
    if (this.usuario.sexo=="H"){
    this.usuario.sexo= "Hombre"; }
    else {
      this.usuario.sexo= "Mujer"; 
    }
  }
  doRefresh(event){
  
    this.services.getAll('empleado/' + this.usuario.id) 
    .then(data => {
      this.userRefresh=data.data;
      this.usuario.documentoIdentidad=data.data.documentoIdentidad;
      this.usuario.direccion=data.data.direccion;
      this.usuario.telefono=data.data.telefono;
      this.usuario.correo=data.data.correo;
      this.usuario.urlFoto=data.data.urlFoto;

      console.log(this.userRefresh);
      event.target.complete();
    }, err => {
      console.log(err);
    }); 
   
 }


}
