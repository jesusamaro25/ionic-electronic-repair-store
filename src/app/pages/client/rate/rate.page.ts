import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {

  rate: any[] = [];
  findText = '';
  constructor(private rates: RateService, private services: ServicesService) { }

  ngOnInit() {
    this.getAll();
  }
  ionViewDidLeave(){
    this.rate = [];
  }
  ionViewDidEnter(){
    this.getAll();
  }
  getAll() {

    this.services.getAll('ordenServicio/sinCalificarServicioCliente') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.rate = data.data;

      }, err => {
        console.log(err);
      });
  }
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
  doRefresh(event){
    this.services.getAll('ordenServicio/sinCalificarServicioCliente') 
    .then(data => {
      console.log('esto es lo que me traigo', data);
      this.rate = data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }


}
 