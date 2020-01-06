import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateServicePage } from './create-service.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

const routes: Routes = [
  {
    path: '',
    component: CreateServicePage
  }
];

@NgModule({
  entryComponents: [
    ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule, //para el modal
    ModalInfoPageModule //para el modal
  ],
  declarations: [CreateServicePage]
})
export class CreateServicePageModule {}
