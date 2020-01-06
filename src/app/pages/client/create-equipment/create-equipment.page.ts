import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service'

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.page.html',
  styleUrls: ['./create-equipment.page.scss'],
})
export class CreateEquipmentPage implements OnInit {
  brand: any[] = [];
  model: any[] = [];
  metodo="tipoEquipo";
  equipmentGroup: FormGroup;
  idtipoequipo:any;
  idmarca:any;
  nombreServicio: "";
  nombrePromocion: "";
  idPromocion: '';
  idServicio: number;
  marcaEquipo: "";
  modeloEquipo: "";
  idModelo: "";
  falla: "";
  idMarca: "";
  mostrarModelo = false;
  marcaprueba=2;


  marca: any[] = [
    {
      id: 'm01',
      nombre: 'HP'
    },
    {
      id: 'm02',
      nombre: 'Dell'
    },
    {
      id: 'm03',
      nombre: 'Compac'
    },
    {
      id: 'm04',
      nombre: 'Samsung'
    }
  ]

  

  modelo: any[] = [
    {
      idModelo: 'mo01',
      nombre: 'Appel II'
    },
    {
      idModelo: 'mo02',
      nombre: 'IBM XT 286'
    },
    {
      idModelo: 'mo03',
      nombre: 'T1100'
    },
    {
      idModelo: 'mo04',
      nombre: 'iMacG3'
    }
  ]

  constructor(private formBuilder: FormBuilder,private router: Router, private rutaActiva: ActivatedRoute, private services: ServicesService) {
    this.equipmentGroup = this.formBuilder.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit() {
   // this.guardarId();
    this.loadBrand();
    //this.loadModel();
    this.nombreServicio = this.rutaActiva.snapshot.params.nombreServicio;
    //this.nombrePromocion = this.rutaActiva.snapshot.params.nombrePromocion;
    this.idServicio = this.rutaActiva.snapshot.params.idServicio;
    //this.idPromocion = this.rutaActiva.snapshot.params.idPromocion;
    //this.idtipoequipo = this.rutaActiva.snapshot.params.idTipoEquipo;
    //console.log(this.idtipoequipo);
    this.rutaActiva.queryParams
      .subscribe(params => {
        this.idPromocion = params['idPromocion']; 
        this.nombrePromocion = params['nombrePromocion'];
        
      });
  

  }

  generarRuta() {
    this.marcaEquipo = this.equipmentGroup.value.marca.nombre;
    this.modeloEquipo = this.equipmentGroup.value.modelo.nombre;
    this.falla = this.equipmentGroup.value.descripcion;
    this.idModelo = this.equipmentGroup.value.modelo.id;
   

  }

  
  mostrarSelectModelo() {
    this.mostrarModelo =
     true;
    this.idmarca =  this.equipmentGroup.value.marca.id; 
    console.log('luisssssssssssssssssss',this.idmarca)
    this.loadModel();
  }
  

  consoleLow() {
    console.log(this.idMarca);
    console.log('Marca:',this.marcaEquipo);
    console.log('Modelo:', this.modeloEquipo);
    console.log('idModelo:', this.idModelo);
    console.log('Descripción:', this.falla);
  }
loadBrand() {
  this.idtipoequipo = this.rutaActiva.snapshot.params.idTipoEquipo;
  
  //console.log('donaiayudameporfavor',this.marca);
  this.services.getAll('tipoEquipo/'+this.idtipoequipo+'/marcas')
   .then(data => {
     console.log(data);
     this.brand=data.data;
   }, err => {
     console.log(err);
   }); 
}
loadModel() {
  this.idtipoequipo = this.rutaActiva.snapshot.params.idTipoEquipo;
  //let idbrand=this.guardarId();
  console.log('modeloEquipo?idMarca='+this.idmarca+'&idTipoEquipo='+this.idtipoequipo)
  this.services.getAll('modeloEquipo?idMarca='+this.idmarca+'&idTipoEquipo='+this.idtipoequipo)
   .then(data => {
     console.log(data);
     this.model=data.data;
   }, err => {
     console.log(err);
   }); 
}
goToPage(){
  this.router.navigate(['/create-date',{nombreServicio: this.nombreServicio, marcaEquipo: this.marcaEquipo, modeloEquipo: this.modeloEquipo, falla: this.falla, idServicio: this.idServicio, idModelo: this.idModelo}], {queryParams: { idPromocion: this.idPromocion, nombrePromocion: this.nombrePromocion} })
}
}
