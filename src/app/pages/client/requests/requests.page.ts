import { Component, OnInit} from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  request: any[] = [];
  findText = '';
  constructor(private services: ServicesService) { }

  ngOnInit() {
   
  }
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
  ionViewDidEnter(){
    this.getAll();
   }
   ionViewDidLeave(){
     this.request = [];
     console.log('imprime',this.request);
   }
  getAll() {

    this.services.getAll('solicitudServicio/cliente') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.request = data.data;

      }, err => {
        console.log(err);
      });
  }
  doRefresh(event){
    this.services.getAll('solicitudServicio/cliente') 
    .then(data => {
     // console.log('esto es lo que me traigo', data);
      this.request = data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
}
