import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ComponentsModule } from 'src/app/components/components.module';
const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule,
    ComponentsModule
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule {}
