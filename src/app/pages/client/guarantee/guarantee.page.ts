import { Component, OnInit, ViewChild  } from '@angular/core';


import { IonSegment } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-guarantee',
  templateUrl: './guarantee.page.html',
  styleUrls: ['./guarantee.page.scss'],
})
export class GuaranteePage implements OnInit {
  section: string = 'two';
  guarantee: any[] = [];
  claims: any[] = [];
  findText = '';
  modelo = '';
  descripcion= '';
  @ViewChild(IonSegment) segment: IonSegment;
  constructor(private services: ServicesService) { }

  ngOnInit() {
    
   
    
  }
  ionViewDidEnter(){
    this.section = 'garantia';
    //this.segment.value = 'garantia';
    this.loadGuarantee();
    this.loadClaims();
  }
  ionViewDidLeave(){
    this.guarantee = [];
    this.claims = [];
  }
  loadGuarantee() {
    this.services.getAll('solicitudServicio/conGarantia')
   .then(data => {
     this.guarantee=data.data;
     console.log('estos son las garantias', this.guarantee);
   }, err => {
     console.log(err);
   }); 
  }
  loadClaims() {
    this.services.getAll('reclamoServicio')
   .then(data => {
     this.claims=data.data;
     console.log('estos son los reclamos', this.claims);
   }, err => {
     console.log(err);
   }); 
  }
  segmentChanged( event ) {

    const segmentValue = event.detail.value;

   if ( segmentValue === 'garantia' ) {
      this.modelo = '';
      this.descripcion = '';

      
      return;
    }

    this.modelo = segmentValue;
    this.descripcion = segmentValue;
   

    console.log(segmentValue);

  }
  segmentButtonClicked(ev: any) {
    console.log('Segment button clicked', ev);
  }
 
  
 
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }

  doRefresh(event){
    this.services.getAll('reclamoServicio')
    .then(data => {
      this.claims=data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
    this.services.getAll('solicitudServicio/conGarantia')
    .then(data => {
      this.guarantee=data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
 }

  

}
