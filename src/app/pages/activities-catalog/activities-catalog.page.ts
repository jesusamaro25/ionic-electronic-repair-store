import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activities-catalog',
  templateUrl: './activities-catalog.page.html',
  styleUrls: ['./activities-catalog.page.scss'],
})
export class ActivitiesCatalogPage implements OnInit {

  catalog: any;

  constructor(private route: ActivatedRoute,private service: ServicesService) { }

  ngOnInit() {
    this.getCatalog()
  }

  getCatalog(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getDetail('catalogoServicio', id).then((val) => {
      this.catalog = val.data;
    });
  }

}
 