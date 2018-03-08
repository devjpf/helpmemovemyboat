import { Component, Injectable, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PubNubAngular } from 'pubnub-angular2';
import { LocationTracker} from '../../providers/location-tracker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pubnub: PubNubAngular;
  channel: string;

  constructor(public navCtrl: NavController, pubnub: PubNubAngular, public locationTracker: LocationTracker) {
    this.channel = 'otter';
        this.pubnub = pubnub;
        this.pubnub.init({
            publishKey: 'pub-c-c5461a1b-447d-408d-ad66-204344d8ed30',
            subscribeKey: 'sub-c-3bbaa458-1883-11e8-91c1-eac6831c625c'
        });
        this.pubnub.subscribe({
            channels: [this.channel],
            triggerEvents: ['message']
        });
    }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }


ngOnInit() {
console.log('crap');
        setInterval(() => {
            let otterLocation = 'Hello World, ' + Date.now();
            this.pubnub.publish({
                channel: this.channel, message: otterLocation
            });
        }, 10000);
    }

}
 