import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServicesService } from 'src/app/services/services.service'

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.page.html',
  styleUrls: ['./review-details.page.scss'],
})
export class ReviewDetailsPage implements OnInit {
  @Input() 
  //revision: Revision[];
  service: any[] = [];
  constructor(private route: ActivatedRoute,  private services: ServicesService) { }

  ngOnInit() {
  //  this.getRevDetail();
    this.getDetail();
  }

  /*getRevDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewS.getRevDetail(id)
        .subscribe( reviewS => {
          console.log( reviewS );
          this.review = reviewS;
      });
  }*/

  ////
  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail('solicitudServicio', id)
        .then( data => {
          console.log('esto es lo que me traigo',data);
          this.service=Array.of(data.data);
          //console.log(this.idTipoEquipo);
          console.log('esto es lo que almaceno',this.service);
        }, err => {
          console.log(err);
        }); 
      
  }

  /*goTo() {
     let navigationExtras: NavigationExtras = {
       queryParams: {
           request: JSON.stringify(this.service)
       }
   };
   this.router.navigate(['generate-review'],navigationExtras);
   
   }*/

}
