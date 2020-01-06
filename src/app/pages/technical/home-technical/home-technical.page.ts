import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-technical',
  templateUrl: './home-technical.page.html',
  styleUrls: ['./home-technical.page.scss'],
})
export class HomeTechnicalPage implements OnInit {
  username:any;
welcomeMessage:any;
apellido:any;
  constructor(private menuCtrl: MenuController, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('nombre').then((val) => {
      this.username=val;
    });
    this.storage.get('apellido').then((val) => {
      this.apellido=val;
    });

    this.findSex();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  findSex(){
    let usersex;
    this.storage.get('sexo').then((val) => {
      usersex=val;
      if (usersex=="M"){
        this.welcomeMessage= "Bienvenida"; }
        if (usersex=="H"){
          this.welcomeMessage= "Bienvenido"; 
        }
    });

}
}
