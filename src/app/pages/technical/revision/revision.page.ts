import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service'
 
@Component({
  selector: 'app-revision',
  templateUrl: './revision.page.html',
  styleUrls: ['./revision.page.scss'],
})
export class RevisionPage implements OnInit {
  service: any[] = [];
  findText = "";

  constructor(private services: ServicesService) {}

  ngOnInit() {
    //this.getReview();
   /* this.services.getAll('solicitudServicio?estatus=NR')
   .then(data => {
     console.log(data);
     this.service=data.data;
     
   }, err => {
     console.log(err);
   }); */
  }
  ionViewDidEnter(){
    this.services.getAll('solicitudServicio?estatus=NR')
    .then(data => {
      console.log(data);
      this.service=data.data;
      
    }, err => {
      console.log(err);
    });
  }
  ionViewDidLeave(){
    this.service = [];
    console.log('imprime',this.service);
  }

  doRefresh(event){
    this.services.getAll('solicitudServicio?estatus=NR')
    .then(data => {
     // console.log('esto es lo que me traigo', data);
      this.service = data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
  /*getReview(){
    this.reviews.getRev()
        .subscribe( reviews => {
          console.log( reviews );
          this.review = reviews;
      });
  }*/
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }

}
