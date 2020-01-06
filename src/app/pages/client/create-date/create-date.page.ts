import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

import * as moment from 'moment';
@Component({
  selector: 'app-create-date',
  templateUrl: './create-date.page.html',
  styleUrls: ['./create-date.page.scss']
})
export class CreateDatePage implements OnInit {
  dateGroup: FormGroup;
  bloqueHora = false;
  nombreServicio: "";
  nombrePromocion: string;
  marcaEquipo: "";
  modeloEquipo: "";
  idServicio: number;
  idPromocion: any;
  idModelo: "";
  falla: "";
  fecha: Date;
  hora: "";
  metodo="bloquehorario";
  idtecnico:any;
  bloquehora: any[] = [];
  resultado: any[] = [];
  horaid:any;
  booltec: boolean;
  today = moment().format('YYYY-MM-DD');
  todayplusyear =  moment().add(1, 'years').format('YYYY-MM-DD'); 
  bloque: any[]=[
    {
      id: 1,
      rango: '08:00AM - 9:59AM',
      
    },
    {
      id: 2,
      rango: '10:00AM - 12:00PM',
     
    },
    {
      id: 3,
      rango: '2:00PM - 03:59PM',
      
    },
    {
      id: 4,
      rango: '4:00PM - 6:00PM',
    
    }

  ]

  constructor(private router: Router ,private formBuilder: FormBuilder, private rutaActiva: ActivatedRoute, private services: ServicesService) {
    this.dateGroup = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      tecnico: ['', Validators.required]
    })
    this.booltec=false;
  }

  ngOnInit() {
    
    this.nombreServicio = this.rutaActiva.snapshot.params.nombreServicio;
    this.marcaEquipo = this.rutaActiva.snapshot.params.marcaEquipo;
    this.falla = this.rutaActiva.snapshot.params.falla;
    this.modeloEquipo = this.rutaActiva.snapshot.params.modeloEquipo;
    this.idModelo = this.rutaActiva.snapshot.params.idModelo;
    
    this.idServicio = this.rutaActiva.snapshot.params.idServicio;
    this.loadHours();
    this.rutaActiva
      .queryParams
      .subscribe(params => {
        this.idPromocion = params['idPromocion']; 
        this.nombrePromocion = params['nombrePromocion'];
        
      });
    

  }

  consoleLog() {
    console.log(this.transform());
    console.log('Hora:', this.hora);
    console.log('Horaid:', this.horaid);
    console.log('idtecnicoprueba:',this.dateGroup.get('tecnico').value);
    console.log('idtecnico:', this.idtecnico);
  }

 generarRuta() {
    this.fecha = this.transform();
    this.hora = this.dateGroup.value.hora.descripcion;
    this.horaid = this.dateGroup.value.hora.id;
  }

  mostrarHora() {
    this.bloqueHora = true;
  }
  transform(): any {
    this.fecha = this.dateGroup.value.fecha;
    return moment(this.fecha).format('DD-MM-YYYY');
   
  }

  loadHours() {
    this.services.getAll(this.metodo)
   .then(data => {
     this.bloquehora=data.data;
     
   }, err => {
     console.log(err);
   }); 
  }
  buscarTecnico(){

    if(this.dateGroup.get('fecha').value!="" && this.dateGroup.get('hora').value!="" ){

      this.horaid = this.dateGroup.value.hora.id;
      this.fecha = this.transform();
      this.services.getAll('agenda/tecnicosDisponibles?idBloqueHorario='+this.horaid+'&idCatalogoServicio='+this.idServicio+'&fecha='+this.fecha).then((data) => {
        this.resultado = data.data;
        console.log(this.resultado);
       if (this.resultado.length>0) {
        this.dateGroup.get('tecnico').setValue(this.resultado[0].id);
       // console.log(this.dateGroup.get('tecnico').setValue(this.resultado[0].id));
       //  console.log('Juniooooooooooor',this.resultado[0].id);

        }
        this.booltec=true;
        this.idtecnico= this.dateGroup.get('tecnico').value;
      }, (err) => {
        console.log(err);
      });
      

    }
  }

goToPage(){
  this.router.navigate(['/create-request', {nombreServicio: this.nombreServicio, marcaEquipo: this.marcaEquipo, modeloEquipo: this.modeloEquipo, falla: this.falla, fecha: this.fecha, hora: this.hora, idModelo: this.idModelo, idServicio: this.idServicio, idtecnico: this.idtecnico, horaid: this.horaid}], {queryParams: { idPromocion: this.idPromocion, nombrePromocion: this.nombrePromocion} })
}
}
