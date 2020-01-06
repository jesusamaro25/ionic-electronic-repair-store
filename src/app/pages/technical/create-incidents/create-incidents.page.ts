import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-incidents',
  templateUrl: './create-incidents.page.html',
  styleUrls: ['./create-incidents.page.scss'],
})
export class CreateIncidentsPage implements OnInit {

  rincidencias: any[] = [
    {
      cliente: 'Luis',
      nombre: 'Tarea 1',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una tablet',
      modeloequipo: 'modeloequipo1',
      color: '#18aca0'
    },
    {
      cliente: 'Adrian',
      nombre: 'Tarea 2',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una telefono marca samsung',
      modeloequipo: 'modeloequipo2',
      color: '#1891ac'
    },
    {
      cliente: 'Donai',
      nombre: 'Tarea 3',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una computadora',
      modeloequipo: 'modeloequipo3',
      color: '#18aca0'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
  doRefresh(event) {
    console.log('Actualizando');
  
    setTimeout(() => {
      console.log('Actualización completada');
      event.target.complete();
    }, 1500);
  }
  

}
