import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})
export class IncidentsPage implements OnInit {

  incidencias: any[] = [];

  constructor(private services: ServicesService) { }

  ngOnInit() {
    this.getAll();
  }
  doRefresh(event){
    this.services.getAll('empleado/incidencias')
    .then(data => {
      this.incidencias=data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
  getAll() {
    this.services.getAll('empleado/incidencias')
   .then(data => {
     this.incidencias=data.data;
     console.log('estos son las incidencias', this.incidencias);
   }, err => {
     console.log(err);
   }); 
  }

}
