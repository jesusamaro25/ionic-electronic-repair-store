import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact: any[] = [];
  findText = '';
  logo:any;
  constructor( private contacts: ContactService, private services: ServicesService ) {}

  ngOnInit() {
 
  }
  ionViewDidLeave(){
    this.contact = [];
  }
  ionViewDidEnter(){
    this.getContact();
    this.getInfo();
  }
  getInfo() {
    this.services.getAll('empresa').then((val) =>  {
      this.logo = val.data;
      console.log(this.logo);
    })
  }
  getContact(){
    this.services.getAll('comentario/usuario').then((val) => {
      this.contact = val.data;
      console.log(val.data);
    })
  }
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
  doRefresh(event){
    this.services.getAll('comentario/usuario').then((val) => {
      this.contact = val.data;
      console.log(val.data);
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
    
 
}

  
