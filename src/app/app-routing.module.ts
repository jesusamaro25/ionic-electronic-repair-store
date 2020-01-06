import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  //Páginas generales: son aquellas que aparecerán tanto para cliente, técnico y usuario no registrado.
  { path: '', loadChildren: './pages/index/index.module#IndexPageModule' },
  { path: 'index', loadChildren: './pages/index/index.module#IndexPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'app', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canLoad: [UserGuard] },
  { path: 'suscribe', loadChildren: './pages/suscribe/suscribe.module#SuscribePageModule' }, 
  { path: 'app1', loadChildren: './pages/tab-technical/tab-technical.module#TabTechnicalPageModule', canLoad: [UserGuard] },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'catalog-details/:id', loadChildren: './pages/catalog-details/catalog-details.module#CatalogDetailsPageModule' },
  { path: 'catalog', loadChildren: './pages/catalog/catalog.module#CatalogPageModule' },
  { path: 'services-catalog/:id', loadChildren: './pages/services-catalog/services-catalog.module#ServicesCatalogPageModule' },
  { path: 'activities-catalog/:id', loadChildren: './pages/activities-catalog/activities-catalog.module#ActivitiesCatalogPageModule' },
  { path: 'faqs', loadChildren: './pages/faqs/faqs.module#FaqsPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },
  //{ path: 'tab-technical', loadChildren: './pages/tab-technical/tab-technical.module#TabTechnicalPageModule' },

  //Páginas concernientes al cliente: se mostrarán una vez el cliente haya iniciado sesión.
  { path: 'home-client', loadChildren: './pages/client/home-client/home-client.module#HomeClientPageModule', canLoad: [UserGuard] },
  { path: 'promotions', loadChildren: './pages/client/promotions/promotions.module#PromotionsPageModule', canLoad: [UserGuard] }, 
  { path: 'notifications-client', loadChildren: './pages/client/notifications-client/notifications-client.module#NotificationsClientPageModule', canLoad: [UserGuard]  },
  { path: 'budget', loadChildren: './pages/client/budget/budget.module#BudgetPageModule', canLoad: [UserGuard]  },
  { path: 'budget-detail/:id', loadChildren: './pages/client/budget-detail/budget-detail.module#BudgetDetailPageModule', canLoad: [UserGuard]  },
  { path: 'contact', loadChildren: './pages/client/contact/contact.module#ContactPageModule', canLoad: [UserGuard]  },
  { path: 'contact-message', loadChildren: './pages/client/contact-message/contact-message.module#ContactMessagePageModule', canLoad: [UserGuard]  },
  { path: 'rate-service/:id', loadChildren: './pages/client/rate-service/rate-service.module#RateServicePageModule', canLoad: [UserGuard]  },
  { path: 'rate-details/:id', loadChildren: './pages/client/rate-details/rate-details.module#RateDetailsPageModule', canLoad: [UserGuard] },
  { path: 'rate', loadChildren: './pages/client/rate/rate.module#RatePageModule', canLoad: [UserGuard]  },
  
  { path: 'create-service', loadChildren: './pages/client/create-service/create-service.module#CreateServicePageModule', canLoad: [UserGuard]  },
  { path: 'create-search/:id', loadChildren: './pages/client/create-search/create-search.module#CreateSearchPageModule', canLoad: [UserGuard]  },
  { path: 'create-date', loadChildren: './pages/client/create-date/create-date.module#CreateDatePageModule', canLoad: [UserGuard]  },
  { path: 'create-equipment', loadChildren: './pages/client/create-equipment/create-equipment.module#CreateEquipmentPageModule', canLoad: [UserGuard]  },
  { path: 'create-request', loadChildren: './pages/client/create-request/create-request.module#CreateRequestPageModule', canLoad: [UserGuard]  },
 
  { path: 'my-equipment-details/:id', loadChildren: './pages/client/my-equipment-details/my-equipment-details.module#MyEquipmentDetailsPageModule' , canLoad: [UserGuard] },
  { path: 'my-equipments', loadChildren: './pages/client/my-equipments/my-equipments.module#MyEquipmentsPageModule', canLoad: [UserGuard]  },
  { path: 'profile-client', loadChildren: './pages/client/profile-client/profile-client.module#ProfileClientPageModule', canLoad: [UserGuard]  },
  { path: 'profile-client-edit', loadChildren: './pages/client/profile-client-edit/profile-client-edit.module#ProfileClientEditPageModule', canLoad: [UserGuard]  },
  { path: 'requests', loadChildren: './pages/client/requests/requests.module#RequestsPageModule', canLoad: [UserGuard]  },
  { path: 'requests-details/:id', loadChildren: './pages/client/requests-details/requests-details.module#RequestsDetailsPageModule', canLoad: [UserGuard]  },
  { path: 'timeline-client/:id', loadChildren: './pages/client/timeline-client/timeline-client.module#TimelineClientPageModule', canLoad: [UserGuard]  },
  { path: 'timeline-request/:id', loadChildren: './pages/client/timeline-request/timeline-request.module#TimelineRequestPageModule', canLoad: [UserGuard]  },
  { path: 'guarantee', loadChildren: './pages/client/guarantee/guarantee.module#GuaranteePageModule', canLoad: [UserGuard]  },
  { path: 'claims-detail/:id/:idg', loadChildren: './pages/client/claims-detail/claims-detail.module#ClaimsDetailPageModule', canLoad: [UserGuard]  },
  { path: 'guarantee-detail/:id', loadChildren: './pages/client/guarantee-detail/guarantee-detail.module#GuaranteeDetailPageModule', canLoad: [UserGuard]  },
  { path: 'claims-message/:id/:techId', loadChildren: './pages/client/claims-message/claims-message.module#ClaimsMessagePageModule', canLoad: [UserGuard]  },
  { path: 'change-password', loadChildren: './pages/client/change-password/change-password.module#ChangePasswordPageModule', canLoad: [UserGuard]  },
  
  //Páginas concernientes al técnico: se mostrarán una vez el técnico haya iniciado sesión.
  { path: 'home-technical', loadChildren: './pages/technical/home-technical/home-technical.module#HomeTechnicalPageModule', canLoad: [UserGuard]  },
  { path: 'notifications-technical', loadChildren: './pages/technical/notifications-technical/notifications-technical.module#NotificationsTechnicalPageModule', canLoad: [UserGuard]  },
  { path: 'schedule', loadChildren: './pages/technical/schedule/schedule.module#SchedulePageModule', canLoad: [UserGuard]  },
  { path: 'calendar', loadChildren: './pages/technical/calendar/calendar.module#CalendarPageModule' , canLoad: [UserGuard] },
  { path: 'profile-technical-edit', loadChildren: './pages/technical/profile-technical-edit/profile-technical-edit.module#ProfileTechnicalEditPageModule', canLoad: [UserGuard]  },
  { path: 'profile-technical', loadChildren: './pages/technical/profile-technical/profile-technical.module#ProfileTechnicalPageModule', canLoad: [UserGuard]  },
  { path: 'generate-budget', loadChildren: './pages/technical/generate-budget/generate-budget.module#GenerateBudgetPageModule', canLoad: [UserGuard]  },
  { path: 'revision', loadChildren: './pages/technical/revision/revision.module#RevisionPageModule' , canLoad: [UserGuard] },
  { path: 'my-services', loadChildren: './pages/technical/my-services/my-services.module#MyServicesPageModule', canLoad: [UserGuard]  },
  { path: 'my-services-detail/:id', loadChildren: './pages/technical/my-services-detail/my-services-detail.module#MyServicesDetailPageModule' , canLoad: [UserGuard] },
  { path: 'my-services-schedule/:id/:techId', loadChildren: './pages/technical/my-services-schedule/my-services-schedule.module#MyServicesSchedulePageModule' , canLoad: [UserGuard] },
  { path: 'my-services-calendar/:id/:techId', loadChildren: './pages/technical/my-services-calendar/my-services-calendar.module#MyServicesCalendarPageModule', canLoad: [UserGuard]  },
  { path: 'review-details/:id', loadChildren: './pages/technical/review-details/review-details.module#ReviewDetailsPageModule', canLoad: [UserGuard]  },
  { path: 'budget-details/:id', loadChildren: './pages/technical/budget-details/budget-details.module#BudgetDetailsPageModule', canLoad: [UserGuard]  },
  { path: 'generate-review/:id', loadChildren: './pages/technical/generate-review/generate-review.module#GenerateReviewPageModule', canLoad: [UserGuard]  },
  { path: 'budget-form/:id/:idcat', loadChildren: './pages/technical/budget-form/budget-form.module#BudgetFormPageModule' , canLoad: [UserGuard] },
  { path: 'incidents', loadChildren: './pages/technical/incidents/incidents.module#IncidentsPageModule', canLoad: [UserGuard]  },
  { path: 'create-incidents', loadChildren: './pages/technical/create-incidents/create-incidents.module#CreateIncidentsPageModule', canLoad: [UserGuard]  },
  { path: 'incidents-register/:id', loadChildren: './pages/technical/incidents-register/incidents-register.module#IncidentsRegisterPageModule', canLoad: [UserGuard]  },
  { path: 'change-password-technical', loadChildren: './pages/technical/change-password-technical/change-password-technical.module#ChangePasswordTechnicalPageModule', canLoad: [UserGuard]  },
  { path: 'promotion', loadChildren: './pages/promotion/promotion.module#PromotionPageModule' }



  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 