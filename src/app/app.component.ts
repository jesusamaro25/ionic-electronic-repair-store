import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushService } from './services/push.service';
//import {Keepalive} from '@ng-idle/keepalive';
//import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
//import { NgIdle } from 'ng-idle';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
    //private idle: Idle, 
   // private keepalive: Keepalive
    //private nIdle: NgIdle
  ) 
  
  
   
    {
      this.initializeApp();
      // sets an idle timeout of 5 seconds, for testing purposes.
      //idle.setIdle(5);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      //idle.setTimeout(5);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  
      //idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      //idle.onTimeout.subscribe(() => {
       // this.idleState = 'Cargado!';
       // this.timedOut = true;
     // });
     // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      //idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'Su aplicación se cargará en ' + countdown + ' segundos!');
  
      // sets the ping interval to 15 seconds
      //keepalive.interval(15);
  
      //keepalive.onPing.subscribe(() => this.lastPing = new Date());
  
     // this.reset();
    }
  
  
    //reset() {
     // this.idle.watch();
      //this.idleState = 'Cargando...';
      //this.timedOut = false;
    //}
    
    
    
    initializeApp() {
   
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.pushService.initialConfig();
        
       // this.idle.startWatching(120).subscribe((res) => {
          //if(res) {
             // console.log("session expired");
         // }
       // })
      });
    }
    
  

  }
  


 
