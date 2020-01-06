import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  catalog: any;
  findText = '';
  constructor(private route: ActivatedRoute, private services: ServicesService) { 
  }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog(){
    this.services.getAll('categoriaTipoEquipo').then((val) => {
      this.catalog = val.data;
    })
  }

  find( event ) {
    // console.log(event);
    this.findText = event.detail.value;
  }
} 