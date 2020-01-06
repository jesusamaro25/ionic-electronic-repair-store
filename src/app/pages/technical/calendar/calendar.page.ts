import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent  } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';


import * as moment from 'moment';
import { ServicesService } from 'src/app/services/services.service';
@Component({ 
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  //variables necesarias
  events: any[];
  eventStart: any;
  eventEnd: any;
  date: any;
  title:any;

  //Elementos propios de ionic calendar
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private services: ServicesService) { }
  ngOnInit() {

 
   // this.resetEvent();
    this.getCalendarData();
  }
  //paso1
  getCalendarData(){ //estoy llamando al arreglo de jsons
    this.services.getAll('agenda/misAgendasPendientes?revision=true') 
    .then(data => {
      console.log('esto es lo que me traigo', data);
      this.events = data.data;
      this.setCalendarData(data.data);
      console.log(this.events);
    }, err => {
      console.log(err);
    });
  }

  //paso2 
  setCalendarData(data){
for (let i=0; i<data.length;i++){
 

  console.log(data[i].date,data[i].fechaActividad +"T"+ this.convertTo24Hour(data[i].bloqueHorario.horaInicio));
  this.eventStart = new Date(moment(data[i].fechaActividad,"DD-MM-YYYY").format("YYYY-MM-DD") +"T"+ this.convertTo24Hour(data[i].bloqueHorario.horaInicio));
  //moment(eventStart).format("DD-MM-YYYYY HH:mm");
  
  this.eventEnd= new Date(moment(data[i].fechaActividad,"DD-MM-YYYY").format("YYYY-MM-DD") +"T"+ this.convertTo24Hour(data[i].bloqueHorario.horaFinal));
  this.title=data[i].descripcion;
  //console.log(this.eventStart, this.eventEnd)
 this.loadCalendar(this.eventStart,this.eventEnd,this.title);

}
  }
  //paso3
  // el titulo lo traigo por parametro y lo pongo tambien el for
  loadCalendar(eventStart, eventEnd, titte){ //es parametro y lo llamo como quiera
    //let j = new Date(eventDate); //creo una variable que almacena que envie como parametro en formato string en un formato date, si lo dejaba sin parametros me traia la fecha actual
    //let r = new Date(Date.UTC(j.getUTCFullYear(), j.getUTCMonth(), j.getUTCDate() + 1)); //le sumo 1 porque js maneja las fechas como un arreglo, es decir desde la posicion 0
    let t = this.title;
    const eventCopy = { //este es el formato del evento en ionic2calendar
      title: t,
      startTime: eventStart, //aca la fecha ya esta trabajada
      endTime: eventEnd,
      allDay: this.event.allDay,//mantener asi por ahora, investigar, importante igualarlo a false
      desc: ''
    };
   
    this.eventSource.push(eventCopy);
    console.log(eventCopy)
    this.myCal.loadEvents();
    console.log(eventCopy)

  }

 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
   // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}

convertTo24Hour(time) {
  var hours = parseInt(time.substr(0, 2));
  if (time.indexOf("am") != -1 && hours == 12) {
    time = time.replace("12", "00");
  }
  
  if (time.indexOf("pm") != -1 && hours < 12) {
    time = time.replace(hours, hours + 12);
  }

  return time.replace(/(am|pm)/, "");
}
//acomodarfecha(diaomes) {
 // if (diaomes < 10) {
    //diaomes = "0" + diaomes;
  //}
 // return diaomes;
//}
//formatoVista(texto) {

 
 // Date = texto.replace(/^(\d{2})-(\d{2})-(\d{4})$/g, "$3/$2/$1");

 // var p = Date.split(/\D/g);
 //return [p[2], p[1], p[0]].join("/");
//}
doRefresh(event) {
  console.log('Actualizando');

  setTimeout(() => {
    console.log('Actualización completada');
    event.target.complete();
  }, 1500);
}

}