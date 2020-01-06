import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Camera } from '@ionic-native/camera/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { NgIdleCoreMule } from 'ng-idle';

//import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

//import { MomentModule } from 'angular2-moment';
registerLocaleData(localeEs);  //función para colocar el calendario en español


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ComponentsModule, 
    HttpClientModule,
    FormsModule,
    //MomentModule,
    //NgIdleKeepaliveModule.forRoot(),
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    DataService,
    SplashScreen,
    OneSignal,
    Camera,
   // NgIdle, 
    { provide: LOCALE_ID, useValue: 'es-ES' }, //colocar el calendario en español
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
