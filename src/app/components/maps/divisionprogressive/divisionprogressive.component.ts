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

type LatLng = [number, number];

@Component({
  selector: 'app-divisionprogressive',
  templateUrl: './divisionprogressive.component.html',
  styleUrls: ['./divisionprogressive.component.scss']
})
export class DivisionprogressiveComponent implements OnInit {

  selectedDistrict: any = '';
  selectedDivision: any = '';
  divisions: any;
  districts: any = [];
  map: any;
  circleIntensityLayer: any;
  mhDistrictWebBdrLayer: any;
  gisDistrictname: any[] = [];
  latLngArray: L.LatLng[] = [];
  title:any;
  constructor(
    private service: CommonService,
    private gisService: GisService
  ) { }

  ngOnInit(): void {
    this.getdivision();
  }

  getdivision() {
    this.service.getDivisions().subscribe((res) => {
      this.divisions = res;
    });
  }

  getDistrict(callback: () => void) {
    this.service.getDistrict(this.selectedDivision).subscribe((res) => {
      console.log(this.districts,'districts')
      this.districts = res;
      callback();
    });
  }

  onSubmit() {
    this.getDistrict(() => {
      this.initMap();
    });
  }

  getDistrictName(districtCode: string): string {
    const selectedDistrictData = this.districts.find((district: any) => district.district === districtCode);
    return selectedDistrictData ? selectedDistrictData.district_name : '';
  }

  private initMap(): void {
    this.title = 'Circle wise Rainfall of  division (as compared to normal rain) for the month of Nov';
    if (!this.map) {
      this.map = L.map('map', {
        zoomControl: true,
        minZoom: 6,
        maxZoom: 18
      }).setView([18.9, 77], 9);

    }
    if (this.circleIntensityLayer) {
      this.map.removeLayer(this.circleIntensityLayer);
    }
    if (this.mhDistrictWebBdrLayer) {
      this.map.removeLayer(this.mhDistrictWebBdrLayer);
    }

    // Ensure districts are fetched and used correctly
    const districtCodes = this.districts.map((district: any) => district.district).join(',');
    console.log(districtCodes,'dist')
    const districtNames = this.districts.map((district: any) => `'${this.gisService.getDistrictName(district.district_name)}'`).join(',');
    console.log(districtNames,'districtNames')
    const currentMonth = new Date().getMonth() + 1;

    this.circleIntensityLayer = L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:mh_rain_intensity_progressive',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `district_code in (${districtCodes}) `
    });

    this.map.addLayer(this.circleIntensityLayer);

    this.mhDistrictWebBdrLayer = L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:mh_district_web_bdr,cite:mh_subdistrict_web_bdr',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `district in (${districtNames}); district in (${districtNames})`
    });

    this.map.addLayer(this.mhDistrictWebBdrLayer);



    this.gisDistrictname = this.districts.map((district: any) => {
      const districtName = this.gisService.getDistrictName(district.district_name);
      const latLon: LatLng | null = this.gisService.getLatLon(districtName);
      if (latLon) {
        const [lat, lng] = latLon;
        return L.latLng(lat, lng);
      }
      return null;
    }).filter((latLng:any): latLng is L.LatLng => latLng !== null);

    if (this.gisDistrictname.length > 0) {
      const bounds = L.latLngBounds(this.gisDistrictname);


      const boundsArray: [number, number][] = [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()]
      ];

       console.log(boundsArray,'dgusydkj,s');
       this.map.fitBounds(boundsArray);
    //   this.map.fitBounds([,
    //     [20.0844273124666,76.4091795896147],
    //     [21.1882651723921,78.1627828064892 ]
    // ]);
     }
  }


}
