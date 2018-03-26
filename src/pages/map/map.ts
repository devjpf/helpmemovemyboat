import { Component, ViewChild, ElementRef, Injectable, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { LocationTracker} from '../../providers/location-tracker';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locationTracker: LocationTracker) {

  }

  ionViewDidEnter() {
      /*Initializing Map*/
      mapboxgl.accessToken = 'pk.eyJ1IjoidGhpbmtsb2NhbCIsImEiOiJKa1RXdzdJIn0.CFk--BMSd946ggOfpE_M_g';
      var map = new mapboxgl.Map({
      style: 'mapbox://styles/thinklocal/cjdx71nkb7q912rmxveexcc3w',
      center: [-0.072785, 51.562109],
      zoom: 9,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });

    console.log(this.locationTracker)
    var otter = {
        "type": "Feature",
        "geometry": {
              "type": "Point",
              "coordinates": [ this.locationTracker.lng, this.locationTracker.lat ]
            },
        "properties": { "title": "Otter" }
      }


        map.on('load', function () {
            map.addLayer({
                "id": "points",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": otter
                },
                "layout": {
                    "icon-image": "rocket-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });
        })

    }
}
