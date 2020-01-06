import { Component, OnInit } from '@angular/core';
//import { BudgetService } from 'src/app/services/budget.services';
//import { ActivityService } from 'src/app/services/activity.service';
import { ServicesService } from 'src/app/services/services.service'


@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
 
  budget: any[] = [];
  errorLoad: boolean=false;
  findText = '';
  constructor(private services: ServicesService) { }
 

 

  ngOnInit() {
   /* this.budgets.getBudget()
    .subscribe( budgets => {
      console.log( budgets );
      this.budget = budgets;
    });*/
    
  }
  ionViewDidEnter(){
    this.getAll();
   }
   ionViewDidLeave(){
     this.budget = [];
     console.log('imprime',this.budget);
   }
  getAll() {

    this.services.getAll('solicitudServicio/presupuestoCliente') 
      .then(data => {
        console.log('esto es lo que me traigo', data);
        this.errorLoad=false;
        this.budget = data.data;
      }, err => {
        console.log("err");
        this.errorLoad=true;

      });
  }
  doRefresh(event){
    this.services.getAll('solicitudServicio/presupuestoCliente') 
    .then(data => {
     // console.log('esto es lo que me traigo', data);
     this.errorLoad=false;
      this.budget = data.data;
event.target.complete();
    }, err => {
      console.log(err);
      this.errorLoad=true;
      event.target.complete();
    });
   
 }
  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }


}

