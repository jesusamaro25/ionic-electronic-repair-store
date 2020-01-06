import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { of } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-claims-detail',
  templateUrl: './claims-detail.page.html',
  styleUrls: ['./claims-detail.page.scss'],
})
export class ClaimsDetailPage implements OnInit {
 activities:any[] = [];
  guarantee:any[] = [];
  orders:any[] = [];
  singleArray:any[] = [];
  idServicio:any;
fecha:any;

  constructor( private router: Router, public alertCtrl: AlertController, private route: ActivatedRoute, private services: ServicesService) { }

  ngOnInit() {
    this.getGuaranteeDetail();
   }
   
   getDetail(){
     const id = +this.route.snapshot.paramMap.get('id');
     this.services.getDetail('ordenServicio', id).then((val) => {
       this.orders = Array.of(val.data);
       console.log('orden',this.orders);
       this.idServicio=val.data.id
       this.pushArray();
     });
     }
    
pushArray(){
  for (let i = 0; i < this.orders.length; i++) {
    this.singleArray.push({
                         o: this.orders[i],
                         g: this.guarantee[i] 
                        });
}
console.log('sa',this.singleArray)
}
  
     getGuaranteeDetail(){
      const id = +this.route.snapshot.paramMap.get('idg');
      this.services.getDetail('garantia', id).then((val) => {
        this.guarantee = Array.of(val.data);
        console.log('garantia',this.guarantee);
        this.activities=val.data.condiciones;
        let fechaHoy= moment().format('YYYY-MM-DD');
        let fechaCulminacion:any = moment(val.data.fechaExpiracion, 'DD-MM-YYYY');
         if(fechaCulminacion.diff(fechaHoy, 'days')<=-1){
this.fecha=0;
         }else {
           this.fecha=fechaCulminacion.diff(fechaHoy, 'days')
         }
        this.getDetail();
        console.log('days',this.fecha);
        console.log(fechaCulminacion);
        

      });
      }
}
