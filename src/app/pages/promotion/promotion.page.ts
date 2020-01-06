import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage implements OnInit {

  promotions: any[] = [];
  findText = '';
  constructor(private services: ServicesService, private router: Router
    ) { }

  ngOnInit() {
    this.getAll();
  }

  find( event ) {
    this.findText = event.detail.value;
  }

  getAll() 
  {
    this.services.getAll('promocion/vigente').then(data => {
        console.log('esto es lo que me traigo', data);
        this.promotions = data.data;
      }, err => {
        console.log(err);
      });
  }

  navigate(id){
    let idPromocion:any;
    let nombrePromocion:any;
    let nombreServicio:any;
    let idServicio:any;
    let idTipoEquipo:any;
    let pos;

    for(let j=0; j<this.promotions.length; j++) {
      if(this.promotions[j].id === id) {
        pos = j;
      } //guardo la posicion del objeto dentro del arreglo que tiene el id igual al id que envio como parametro
    } 
    console.log(nombreServicio=this.promotions[pos].catalogoServicio.descripcion);
    console.log(idPromocion=id);
    console.log(idServicio=this.promotions[pos].catalogoServicio.id);
    console.log(nombrePromocion=this.promotions[pos].nombre);
    console.log(idTipoEquipo=this.promotions[pos].catalogoServicio.tipoEquipo.id);
    this.router.navigate(['/login'],{queryParams: { nombreServicio: nombreServicio, idPromocion: idPromocion, idServicio: idServicio, nombrePromocion: nombrePromocion, idTipoEquipo: idTipoEquipo} });
  }
}
