import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-my-equipments',
  templateUrl: './my-equipments.page.html',
  styleUrls: ['./my-equipments.page.scss'],
})
export class MyEquipmentsPage implements OnInit {
    equipment: any[] = [];
    
    findText = '';
    constructor(private services: ServicesService) { }
  
    ngOnInit() {
      /*this.equipments.getEquipments()
        .subscribe( equipments => {
          console.log( equipments );
          this.equipment = equipments;
        });*/
    }
    ionViewDidEnter(){
      this.getAll();
     }
     ionViewDidLeave(){
       this.equipment = [];
       console.log('imprime',this.equipment);
     }
    getAll() {

      this.services.getAll('ordenServicio/enReparacion') 
        .then(data => {
          console.log('esto es lo que me traigo', data);
          this.equipment = data.data;
  
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
        this.equipment = data.data;
  event.target.complete();
      }, err => {
        console.log(err);
      });
     
   }
      
}
