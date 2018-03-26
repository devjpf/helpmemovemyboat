import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA6uDYEPkPFkHXx_S1q9uIOLgEfiZkowVo",
  authDomain: "helpmemovemyboat-1520449467814.firebaseapp.com",
  databaseURL: "https://helpmemovemyboat-1520449467814.firebaseio.com",
  projectId: "helpmemovemyboat-1520449467814",
  storageBucket: "helpmemovemyboat-1520449467814.appspot.com",
};

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
     firebase.initializeApp(config);
     console.log("done!")
     firebase.auth().signInWithEmailAndPassword("devjpf@gmail.com", "devjpf").catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // ...
     });
  }
}
