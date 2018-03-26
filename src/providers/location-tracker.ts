import { HTTP } from '@ionic-native/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation,BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { ToastController } from 'ionic-angular';

import * as firebase from 'Firebase';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class LocationTracker {
  otterLocation: string;

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation, public toastCtrl: ToastController) {

}


startTracking() {

// For realtime
let database = firebase.database();

// For Firestore

//Create new route key
var newRouteKey = firebase.database().ref().child('routes').push().key;



      let toast = this.toastCtrl.create({
        position: 'bottom',
        message: 'Finding location of Otter',
        duration: 3000,
        cssClass: 'text-align: center'
      });
      toast.present();


 // Background Tracking
 console.log("here")
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10,
    debug: true,
    interval: 2000
  };

  this.backgroundGeolocation.configure(config).subscribe((location) => {

    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

    // Run update inside of Angular's zone
      this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });

  }, (err) => {

    console.log(err);

  });





  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();


  // Foreground Tracking

let options = {
  frequency: 3000,
  enableHighAccuracy: true
};

this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

  // console.log(position);

  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });


let postOtter = {
"type": "Feature", "geometry": { "type": "Point", "coordinates": [ position.coords.longitude, position.coords.latitude ] }, "properties": { "title": "Otter" }

};


// Get a key for a new Post.
  var newPostKey = firebase.database().ref().child(newRouteKey).push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/routes/' + newRouteKey + '/' + newPostKey] = postOtter;

  return firebase.database().ref().update(updates);

});

}



  stopTracking() {
    let toast = this.toastCtrl.create({
      message: 'Stopped tracking Otter',
      duration: 3000
    });
    toast.present();

 	console.log('stopTracking');

  this.backgroundGeolocation.stop();
  this.watch.unsubscribe();

  }

}
