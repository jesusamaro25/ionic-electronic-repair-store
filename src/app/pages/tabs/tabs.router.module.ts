import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-client',
        children: [
          {
            path: '',
            loadChildren: '../client/home-client/home-client.module#HomeClientPageModule'
          }
        ]
      },
      {
        path: 'notifications-client',
        children: [
          {
            path: '',
            loadChildren: '../client/notifications-client/notifications-client.module#NotificationsClientPageModule'
          }
        ]
      },
      {
        path: 'promotions',
        children: [
          {
            path: '',
            loadChildren: '../client/promotions/promotions.module#PromotionsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home-client',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-client',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
