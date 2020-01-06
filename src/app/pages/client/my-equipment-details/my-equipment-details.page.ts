import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';

 @Component({
  selector: 'app-my-equipment-details',
  templateUrl: './my-equipment-details.page.html',
  styleUrls: ['./my-equipment-details.page.scss'],
})

export class MyEquipmentDetailsPage implements OnInit {
  
  equipment: any[];
  total: number;
  subTotal:number;
  promocion:any;
  constructor(private services: ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
  
  this.getDetail();
  }
  getDetail(){
    
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail('ordenServicio', id)
        .then( data => {
          console.log('esto es lo que me traigo',data);
          this.equipment=Array.of(data.data);
          const reparacion=data.data.solicitudServicio.presupuesto;
          const revision=data.data.solicitudServicio.revision.costo;
          const descuento=(data.data.solicitudServicio.promocion.descuento.porcentaje)/100;
          this.subTotal= reparacion+revision;
          if (typeof data.data.solicitudServicio.promocion.id==="undefined"){
            this.promocion= "No aplica";
            this.total= (reparacion+revision);
          }
          else{
            this.promocion=((reparacion+revision)*descuento);
            this.total= (reparacion+revision) - ((reparacion+revision)*descuento);
          }
          console.log('esto es lo que almaceno',this.equipment);
        }, err => {
          console.log(err);
        }); 
  }

 
}
