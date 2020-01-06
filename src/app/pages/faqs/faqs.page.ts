import { Component, OnInit} from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  faqs: any;
  automaticClose = false;
  constructor(private services: ServicesService) { 
  }

  ngOnInit() {
    this.getFaqs();
  }
  getFaqs(){
    this.services.getAll('preguntaFrecuente').then((val) => {
      this.faqs = val.data;
      this.faqs[0].open = false;
    });
  }

  toggleSection(index) {
    this.faqs[index].open = !this.faqs[index].open;

    if (this.automaticClose && this.faqs[index].open){
      this.faqs
      .filter((itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }
  }
}
