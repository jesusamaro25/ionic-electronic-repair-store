import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-rate-details',
  templateUrl: './rate-details.page.html',
  styleUrls: ['./rate-details.page.scss'],
})
export class RateDetailsPage implements OnInit {

 
  request:any[];
  promo:boolean=true;
  subTotal:any;
  total:any;
  promocion:any;
  constructor(private services: ServicesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id'); //recivo el id de la pagina anterior
    this.services.getDetail('solicitudServicio', id) //services es la instancia de ServicesService, recuerde que el url puede cambiar, por favor preguntar
        .then( data => {
          console.log('esto es lo que me traigo',data); //una guia muy importante para que vean si el objeto que trajeron es el correcto
          this.request=Array.of(data.data); //budget es la variable declarada en el paso 10, y array of es un metodo que me transforma el objeto en un array porque necesito que sea un array para poder iterarlo en el html
          const reparacion=data.data.presupuesto;
          const revision=data.data.revision.costo;
          const descuento=(data.data.promocion.descuento.porcentaje)/100;
          this.subTotal= reparacion+revision;
          if (typeof data.data.promocion.id==="undefined"){
            this.promocion= "No aplica";
            this.total= (reparacion+revision);
          }
          else{
            this.promocion=((reparacion+revision)*descuento);
            this.total= (reparacion+revision) - ((reparacion+revision)*descuento);
          }
          if (typeof data.data.promocion.nombre==="undefined"){
            this.promo=false;
          }
          //console.log(this.idTipoEquipo); 
          console.log('esto es lo que almaceno',this.request); //guia importante para saber si el array es el correcto
        }, err => {
          console.log(err);
        }); 
      
  } 

}