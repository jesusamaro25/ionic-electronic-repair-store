import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-timeline-client',
  templateUrl: './timeline-client.page.html',
  styleUrls: ['./timeline-client.page.scss'],
})
export class TimelineClientPage implements OnInit {

  timeline: any;
  statusChart:any;
  statusString:any;
  constructor(public services:ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAll();
  
  }

  getAll() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getAll('ordenServicio/'+id) 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.timeline = data.data.agendas;
        for(let j=0; j<this.timeline.length; j++) {
          this.statusChart = data.data.agendas[j].estatus;
          if (this.statusChart=="E"){
            this.timeline[j].status="En espera";
          }
          else if (this.statusChart=="L") {
            this.timeline[j].status="Completado";
          }
          else {
            this.timeline[j].status="Reagendado";
          }
          console.log('estatus', this.statusChart);
          }
       
        console.log('esto es lo que almaceno', this.timeline);
      }, err => {
        console.log(err);
      });
  }
  transformStatus(){
   
  }
}
