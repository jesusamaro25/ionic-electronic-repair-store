import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { AccordionComponent } from './accordion/accordion.component';
import { PopoverComponent } from './popover/popover.component';
import { PopoverleftComponent } from './popoverleft/popoverleft.component';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, MenuClientComponent, AccordionComponent, PopoverComponent, PopoverleftComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
HeaderComponent, MenuComponent, MenuClientComponent, AccordionComponent, PopoverComponent, PopoverleftComponent
  ]
})
export class ComponentsModule { }
 