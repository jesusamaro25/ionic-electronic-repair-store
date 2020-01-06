import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.page.html',
  styleUrls: ['./my-services.page.scss'],
})
export class MyServicesPage implements OnInit {
  order: any[] = [];
  findText = ''; 
  constructor(private services: ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
   this.getAll();
  }
  ionViewDidLeave(){
    this.order = [];
    console.log('imprime',this.order);
  }
  getAll() {

    this.services.getAll('ordenServicio/enReparacion') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.order = data.data;

      }, err => {
        console.log(err);
      });
  }

  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
  doRefresh(event){
    this.services.getAll('ordenServicio/enReparacion') 
    .then(data => {
     // console.log('esto es lo que me traigo', data);
      this.order = data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
}
