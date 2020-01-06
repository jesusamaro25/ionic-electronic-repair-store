import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabTechnicalPage } from './tab-technical.page';

const routes: Routes = [
  {
    path: 'tab-technical',
    component: TabTechnicalPage,
    children: [
      {
        path: 'home-technical',
        children: [
          {
            path: '',
            loadChildren: '../technical/home-technical/home-technical.module#HomeTechnicalPageModule'
          }
        ]
      },
      {
        path: 'notifications-technical',
        children: [
          {
            path: '',
            loadChildren: '../technical/notifications-technical/notifications-technical.module#NotificationsTechnicalPageModule'
          }
        ]
      },
     //
     {
      path: 'generate-budget',
      children: [
        {
          path: '',
          loadChildren: '../technical/generate-budget/generate-budget.module#GenerateBudgetPageModule'
        }
      ]
    },
      {
        path: '',
        redirectTo: 'home-technical',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-technical',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabTechnicalPageRoutingModule {}
