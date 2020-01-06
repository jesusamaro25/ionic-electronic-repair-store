import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { IndexPage } from './index.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverleftComponent } from 'src/app/components/popoverleft/popoverleft.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  }
];

@NgModule({
  entryComponents: [
    PopoverComponent,
    PopoverleftComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
