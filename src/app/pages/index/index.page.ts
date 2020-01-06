import { Component, OnInit} from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverleftComponent } from 'src/app/components/popoverleft/popoverleft.component';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class IndexPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  index: any;
  logo: any;

  constructor(private popoverController: PopoverController, private services: ServicesService) {
    this.getCharac();
    this.getInfo();
  }
  
  ngOnInit() {
  }

  getCharac() {
    this.services.getAll('caracteristicaEmpresa').then((val) =>  {
      this.index = val.data;
    })
  }

  getInfo() {
    this.services.getAll('empresa').then((val) =>  {
      this.logo = val.data;
    })
  }

  async popTwo(ev) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      cssClass: "popover-class"
    });
    return await popover.present();
  }

  async popOne(ev) {
    const popover = await this.popoverController.create({
      component: PopoverleftComponent,
      event: ev,
      translucent: true,
      cssClass: "popover-class"
    });
    return await popover.present();
  }
}