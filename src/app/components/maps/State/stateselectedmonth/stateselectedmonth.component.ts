import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { GisService } from 'src/app/service/gis/gis.service';
import * as L from 'leaflet';

declare module 'leaflet' {
  export interface WMSOptions {
    serverType?: string;
    CQL_FILTER?: string;
  }
}

@Component({
  selector: 'app-stateselectedmonth',
  templateUrl: './stateselectedmonth.component.html',
  styleUrls: ['./stateselectedmonth.component.scss']
})
export class StateselectedmonthComponent implements OnInit {
  selectedMonth: number | null = null; // Initialize as null for clarity
  title: string = '';
  arraymonth: { name: string, value: number }[] = [];

  constructor(private service: CommonService, private gisService: GisService) {}

  ngOnInit(): void {
    this.generatemonths();
  }

  generatemonths() {
    const currentMonthIndex = new Date().getMonth();
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    this.arraymonth = monthes.slice(0, currentMonthIndex + 1).map((month, index) => ({
      name: month,
      value: index + 1
    }));
  }

  onSubmit() {
    if (this.selectedMonth !== null) { // Ensure selectedMonth is not null
      this.initMap();
    }
  }

  private initMap(): void {
    const selectedMonthObj = this.arraymonth.find(month => month.value === this.selectedMonth);
    const selectedMonthName = selectedMonthObj ? selectedMonthObj.name : 'Unknown';

    this.title = `Circle wise Rainfall of Maharashtra State (as compared to normal rain) for the month of Nov`;

    const bounds = new L.LatLngBounds(new L.LatLng(22, 75), new L.LatLng(15, 80));
    const map = L.map('map', {
      zoomControl: true,
      minZoom: 6,
      maxZoom: 18,
      maxBounds: bounds
    }).setView([18.9, 77], 7);

    L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
      layers: 'cite:mh_rain_intensity',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `int_month = ${this.selectedMonth}`,
    }).addTo(map);

    L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
      layers: 'cite:mh_district_web_bdr,cite:mh_subdistrict_web_bdr',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
    }).addTo(map);
  }
}
