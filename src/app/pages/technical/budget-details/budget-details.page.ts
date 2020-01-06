//PASO8: ver en el url de la app que si se envio el id correcto, por ejemplo deberia haber algo como: http://localhost:8100/budget-details/4 en caso que 4 fuese el id que quiero
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//PASO9: borrar o comentar la clase y el servicio como lo estabamos trabajando, e importar ServicesService

//import { BudgetsService } from 'src/app/services/budgets.service';
//import { Budget } from 'src/app/clases/budgets';
import { ServicesService } from 'src/app/services/services.service'

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.page.html',
  styleUrls: ['./budget-details.page.scss'],
})
export class BudgetDetailsPage implements OnInit {
  //PASO10: borrar o comentar esto del input y la instancia de Budget o su equivalente y crear un una variable de tipo any que guarde lo que traiga la api, tambien hay que borrar del constructor la instancia de BudgetService o su equivalente y agregar el de ServicesService
  //@Input() budg: Budget;
  //budget: Budget[];
  budget: any[] = [];

  constructor(private services: ServicesService, private route: ActivatedRoute) { }
//
  ngOnInit() {
    //PASO12: llamar al metodo correcto, es decir el unico activo que hay, y comentar o borrar el que se traia los datos con el metodo pasado
    //this.getBudgetDetail();
    this.getDetail();
  }
//PASO 11: borrar o comentar el metodo pasado e implementar el que se encuentra activo
  /*getBudgetDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.budgetS.getBudgetDetail(id)
        .subscribe( budgetS => {
          console.log( budgetS );
          this.budg = budgetS;
      });
  }*/
  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id'); //recivo el id de la pagina anterior
    this.services.getDetail('solicitudServicio', id) //services es la instancia de ServicesService, recuerde que el url puede cambiar, por favor preguntar
        .then( data => {
          console.log('esto es lo que me traigo',data); //una guia muy importante para que vean si el objeto que trajeron es el correcto
          this.budget=Array.of(data.data); //budget es la variable declarada en el paso 10, y array of es un metodo que me transforma el objeto en un array porque necesito que sea un array para poder iterarlo en el html
          //console.log(this.idTipoEquipo);
          console.log('esto es lo que almaceno',this.budget); //guia importante para saber si el array es el correcto
        }, err => {
          console.log(err);
        }); 
      
  }
}
