import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';
import * as moment from 'moment';
@Component({
  selector: 'app-timeline-request',
  templateUrl: './timeline-request.page.html',
  styleUrls: ['./timeline-request.page.scss'],
})
export class TimelineRequestPage implements OnInit {
  timeline: any[];
 // date:any;
  constructor(public services:ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getAll('solicitudServicio/'+id+'/bitacora') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.timeline = data.data;
      //  this.date=moment(data.data[0].fechaMovimiento).format('DD-MM-YYYY');
       // this.transform();
        //this.statusChart = data.data.agendas.estatus;
       // this.transformStatus();
       //console.log('esta es la fecha', this.date);
        console.log('esto es lo que almaceno', this.timeline);
      }, err => {
        console.log(err);
      });
  }

  
}
