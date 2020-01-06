import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-requests-details',
  templateUrl: './requests-details.page.html',
  styleUrls: ['./requests-details.page.scss'],
})
export class RequestsDetailsPage implements OnInit {
  request: any[];
  estatus: any;
  motivo: boolean=false;
  promo: boolean=true;
  constructor(private services: ServicesService , private route: ActivatedRoute) {}
 
  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id'); //recivo el id de la pagina anterior
    this.services.getDetail('solicitudServicio', id) //services es la instancia de ServicesService, recuerde que el url puede cambiar, por favor preguntar
        .then( data => {
          console.log('esto es lo que me traigo',data); //una guia muy importante para que vean si el objeto que trajeron es el correcto
          this.request=Array.of(data.data); //budget es la variable declarada en el paso 10, y array of es un metodo que me transforma el objeto en un array porque necesito que sea un array para poder iterarlo en el html
          if (typeof data.data.promocion.nombre==="undefined"){
            this.promo=false;
          }
          //console.log(this.idTipoEquipo);
          if (data.data.estatus=="R"){
            this.estatus= "Rechazado"; 
            this.motivo=true;
          }
            else 
            if (data.data.estatus=="A") {
              this.estatus= "Aprobado"; 
            }
            else
            this.estatus= "Esperando respuesta"; 
          console.log('esto es lo que almaceno',this.request); //guia importante para saber si el array es el correcto
        }, err => {
          console.log(err);
        }); 
      
  } 

}       
