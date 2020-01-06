import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.page.html',
  styleUrls: ['./create-search.page.scss'],
})
export class CreateSearchPage implements OnInit {
  //service: Service[];
  service: any[] = [];
  metodo="catalogoServicio";

  //services: any[] = [];
  findText = '';
  serviceGroup: FormGroup;
  mostrarPromocion = false;
  nombreServicio: any;
  nombrePromocion: string;
  idServicio:number;
  idPromocion:any;
  
  idTipoEquipo: any;
  promotions:any[] = [];
  constructor(private formBuilder: FormBuilder,private router: Router, private services: ServicesService,  private route: ActivatedRoute) { }

  ngOnInit() {

    this.getSerDetail();
    this.loadPromotions();
   /* this.dataService.getServices()
      .subscribe(services => {
        console.log(services);
        this.services = services;
      });*/

    this.serviceGroup = new FormGroup({
      servicio: new FormControl('', [Validators.required]),
      promocion: new FormControl(''),
    });
    
  }

  getSerDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.idServicio = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail(this.metodo, id)
        .then( data => {
          console.log(data);
          this.service=Array.of(data.data);
          this.nombreServicio=data.data.descripcion;
          this.idTipoEquipo=data.data.tipoEquipo.id;
          //console.log(this.idTipoEquipo);
          console.log(this.service);
        }, err => {
          console.log(err);
        }); 
      
  }

 

  mostrarItemProm() {
    this.mostrarPromocion = true;
  }

  generarLink() { 
    
    this.nombreServicio;
    if(this.serviceGroup.value.promocion.nombre === ""){
      console.log("No hay promoción")
    }else{
      this.nombrePromocion = this.serviceGroup.value.promocion.nombre;
      this.idPromocion = this.serviceGroup.value.promocion.id;
    }
    //if (this.nombrePromocion==="undefined"){
      //this.nombrePromocion="";
      //this.idPromocion="";
    //}
    //else {
      //this.nombrePromocion = this.serviceGroup.value.promocion.nombre;
      //this.idPromocion = this.serviceGroup.value.promocion.id;
    //}
    
  }

  loadPromotions() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getAll('promocion/servicio/'+id) 
   .then(data => {
     this.promotions=data.data;
   }, err => {
     console.log(err);
   }); 
  }

  find(event) {
    // console.log(event);
    this.findText = event.detail.value;
  }
 
 //Para pasar los parametros por routernavigate creamos la funcion goToPage()
 //primer parámetro es la ruta hacía donde va, el segundo son los parametros obligatorios y el terecero son parametros opcionales
 //en eñ html se llama a esta función en el botón de siguiente
 //siguiente paso 'descargar' estos datos en la siguiente pag
  goToPage(){
  this.router.navigate(['/create-equipment', { nombreServicio: this.nombreServicio, idServicio: this.idServicio, idTipoEquipo: this.idTipoEquipo}], {queryParams: { idPromocion: this.idPromocion, nombrePromocion: this.nombrePromocion} });
  }
}
