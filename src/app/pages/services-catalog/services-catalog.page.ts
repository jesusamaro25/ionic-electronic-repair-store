import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { Skills } from 'src/app/clases/skills';

@Component({
  selector: 'app-services-catalog',
  templateUrl: './services-catalog.page.html',
  styleUrls: ['./services-catalog.page.scss'],
})
export class ServicesCatalogPage implements OnInit {

  service: Array < Skills > = [];
  findText = '';

  constructor(private route: ActivatedRoute, private serv: ServicesService) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.serv.getAll('tipoEquipo/'+id+'/catalogosServicio').then((val) => {
      this.service = val.data;
    });
  }
    find( event ) {
      this.findText = event.detail.value;
    }

}
 