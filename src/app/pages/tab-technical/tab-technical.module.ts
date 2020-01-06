import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabTechnicalPage } from './tab-technical.page';
import { TabTechnicalPageRoutingModule } from './tab-technical.router.module'; 

const routes: Routes = [
  {
    path: '',
    component: TabTechnicalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TabTechnicalPageRoutingModule
  ],
  declarations: [TabTechnicalPage]
})
export class TabTechnicalPageModule {}
