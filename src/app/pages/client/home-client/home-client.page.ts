import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
})
export class HomeClientPage implements OnInit {
username:any;
usersex:any;
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

