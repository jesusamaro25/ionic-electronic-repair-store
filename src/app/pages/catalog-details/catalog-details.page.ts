import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { Catalog } from 'src/app/clases/catalog';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.page.html',
  styleUrls: ['./catalog-details.page.scss'],
})
export class CatalogDetailsPage implements OnInit {

  @Input() cat: Catalog;
  catalog: any;
  findText = '';

  constructor(private route: ActivatedRoute, private service: ServicesService) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getDetail('categoriaTipoEquipo', id).then((val) => {
      this.catalog = val.data;
    });
    }

    find( event ) {
      // console.log(event);
      this.findText = event.detail.value;
    }
}
 