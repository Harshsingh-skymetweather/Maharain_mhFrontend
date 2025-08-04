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
  selector: 'app-district-progressive',
  templateUrl: './district-progressive.component.html',
  styleUrls: ['./district-progressive.component.scss']
})
export class DistrictProgressiveComponent implements OnInit {

  selectedDistrict: any = '';
  divisions: any;
  districts: any;
  dist: any;
  map: any;
  circleIntensityLayer: any;
  mhDistrictWebBdrLayer: any;

  constructor(private service: CommonService,
    private gisService:GisService
  ) { }

  ngOnInit(): void {
    this.getDistrict('');
  }

  getDistrict(title: any) {
    this.service.getDistrict(title).subscribe((res) => {
      this.districts = res;
      console.log(this.districts);
    });
  }

  onSubmit() {
    console.log(this.selectedDistrict, 'selectedDistrict');
    if(this.selectedDistrict !== '') {
      this.dist = this.getDistrictName(this.selectedDistrict);
      console.log(this.dist);
      this.initMap();
    }
  }

  getDistrictName(districtCode: string): string {
    const selectedDistrictData = this.districts.find((district: any) => district.district === districtCode);
    return selectedDistrictData ? selectedDistrictData.district_name : '';
  }

  private initMap(): void {
    if (!this.map) {
      const bounds = new L.LatLngBounds(new L.LatLng(22, 75), new L.LatLng(15, 80));
      this.map = L.map('map', {
        zoomControl: true,
        minZoom: 6,
        maxZoom: 18
      }).setView([18.9, 77], 9);

      L.tileLayer('https://api.mapbox.com/v3/openstreetmap.1b68f018/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q').addTo(this.map);
    }

    // Remove existing district layers if they exist
    if (this.circleIntensityLayer) {
      this.map.removeLayer(this.circleIntensityLayer);
    }
    if (this.mhDistrictWebBdrLayer) {
      this.map.removeLayer(this.mhDistrictWebBdrLayer);
    }

    const districtCode = this.selectedDistrict;
    const districtName = `'${this.getDistrictName(districtCode)}'`;
    const gisdistrictName=this.gisService.getDistrictName(this.getDistrictName(districtCode))

    const currentMonth = new Date().getMonth() + 1;

    this.circleIntensityLayer = L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:mh_rain_intensity',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `int_month=${currentMonth} AND district_code=${districtCode}`
    });

    this.map.addLayer(this.circleIntensityLayer);

    this.mhDistrictWebBdrLayer = L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:mh_district_web_bdr,cite:mh_subdistrict_web_bdr',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `district in (${districtName});  district in (${districtName})`
    });

    this.map.addLayer(this.mhDistrictWebBdrLayer);

   const latlng = this.gisService.getLatLon(this.getDistrictName(this.selectedDistrict));

   if (latlng && latlng.length === 2) {
    console.log(latlng, 'Coordinates');
    this.map.setView([latlng[1], latlng[0]], 9);
  }

  else {
    console.error('Invalid coordinates:', latlng);
  }


  }


}
