import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-guarantee-detail',
  templateUrl: './guarantee-detail.page.html',
  styleUrls: ['./guarantee-detail.page.scss'],
})
export class GuaranteeDetailPage implements OnInit {


  claims: any[];

  constructor(private services: ServicesService, private router: Router, public alertCtrl: AlertController , private route: ActivatedRoute) { }

  ngOnInit() {
  this.getDetail();
  }
  getDetail(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.services.getDetail('reclamoServicio', id).then((val) => {
      this.claims = Array.of(val.data);
      console.log(this.claims);
    });
    }

}
