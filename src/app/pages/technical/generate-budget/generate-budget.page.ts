import { Component, OnInit } from '@angular/core';
/*PASO1: lo primero es borrar/comentar el servicio de BudgetService o el equivalente en su componente, debido a que
esto es del servicio de pruebas anterior. Luego debemos importar a ServicesService que es donde estan los metodos para
comunicarnos con la API. 
*/
//import { BudgetsService } from 'src/app/services/budgets.service'; 
import { ServicesService } from 'src/app/services/services.service'

@Component({
  selector: 'app-generate-budget',
  templateUrl: './generate-budget.page.html',
  styleUrls: ['./generate-budget.page.scss'],
})
export class GenerateBudgetPage implements OnInit {
  budget: any[] = [];
  findText = "";
  constructor(private services: ServicesService) { }

  ngOnInit() {
   // this.getAll();
  }
  ionViewDidEnter(){
    this.services.getAll('solicitudServicio?estatus=SP')
      .then(data => {
       console.log('esto es lo que me traigo', data);
        this.budget = data.data;

      }, err => {
        console.log(err);
      });
  }
  ionViewDidLeave(){
    this.budget = [];
    console.log('imprime',this.budget);
  }

  doRefresh(event){
    this.services.getAll('solicitudServicio?estatus=SP')
    .then(data => {
     // console.log('esto es lo que me traigo', data);
      this.budget = data.data;
event.target.complete();
    }, err => {
      console.log(err);
    });
   
 }
  /*async getAll() :Promise<any>{
    this.budget = await this.services.getAll('solicitudServicio?estatus=SP');
  }*/
  /*getBudget(){
    this.budgets.getBudget()
        .subscribe( budgets => {
          console.log( budgets );
          this.budget = budgets;
      });
  }*/
  find(event) {
    // console.log(event);
    this.findText = event.detail.value;
  }

}
