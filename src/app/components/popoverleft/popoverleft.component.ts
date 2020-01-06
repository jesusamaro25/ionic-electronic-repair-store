import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popoverleft',
  templateUrl: './popoverleft.component.html',
  styleUrls: ['./popoverleft.component.scss'],
})
export class PopoverleftComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController, private router: Router) { }

  ngOnInit() {}

  onClickC(){
    this.popoverCtrl.dismiss();
    this.router.navigate(['/catalog']);
  }

  onClickP(){
    this.popoverCtrl.dismiss();
    this.router.navigate(['/promotion']);
  }

}
