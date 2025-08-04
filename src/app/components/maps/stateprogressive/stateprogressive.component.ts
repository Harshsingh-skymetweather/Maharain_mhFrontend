import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
declare module 'leaflet' {
  export interface WMSOptions {
    serverType?: string;
    CQL_FILTER?: string;

  }
}
declare module 'leaflet' {
  export interface WMSOptions {
    serverType?: string;
  }
}

@Component({
  selector: 'app-stateprogressive',
  templateUrl: './stateprogressive.component.html',
  styleUrls: ['./stateprogressive.component.scss']
})
export class StateprogressiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
  private initMap(): void {
    const bounds = new L.LatLngBounds(new L.LatLng(22, 75), new L.LatLng(15, 80));
    const map = L.map('map', {
      zoomControl: true,
      minZoom: 6,
      maxZoom: 18
    }).setView([18.9, 77], 7);


  const circleIntensityLayer = L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
    layers:  'cite:mh_rain_intensity_progressive',
    transparent: true,
    format: 'image/png',
    serverType: 'geoserver',
    //CQL_FILTER: 'int_month = 7',
  });

   map.addLayer(circleIntensityLayer);

    const mhDistrictWebBdr = L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
      layers: 'cite:mh_district_web_bdr,cite:mh_subdistrict_web_bdr',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver'
    });

    map.addLayer(mhDistrictWebBdr);
  }

  downloadMapPdf()
  {

  }


}

