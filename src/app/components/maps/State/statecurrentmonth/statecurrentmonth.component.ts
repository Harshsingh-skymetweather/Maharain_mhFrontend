import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as L from 'leaflet';

@Component({
  selector: 'app-statecurrentmonth',
  templateUrl: './statecurrentmonth.component.html',
  styleUrls: ['./statecurrentmonth.component.scss']
})
export class StatecurrentmonthComponent implements OnInit {
  private map: any;
  private mapInitialized: boolean = false;
  currentMonthIndex: number = new Date().getMonth();
  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const bounds = new L.LatLngBounds(new L.LatLng(22, 75), new L.LatLng(15, 80));

    this.map = L.map('map', {
      zoomControl: true,
      minZoom: 6,
      maxZoom: 18,
      maxBounds: bounds
    }).setView([18.9, 77], 7);

    const circleIntensityLayer = L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
      layers: 'cite:mh_rain_intensity',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: `int_month = ${this.currentMonthIndex + 1}`,
    }).addTo(this.map);

    const mhDistrictWebBdr = L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms', {
      layers: 'cite:mh_district_web_bdr,cite:mh_subdistrict_web_bdr',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
    }).addTo(this.map);

  }

  downloadMapPdf(): void {
    console.log('Generating PDF from map');
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error("Map element not found.");
        return;
    }

    // Wait a short period to ensure the map is fully rendered
    setTimeout(() => {
        html2canvas(mapElement, {
            scale: 2, // Higher resolution
            useCORS: true, // Handle CORS issues
            logging: true, // Enable logging for debugging
            allowTaint: false, // Prevent tainting
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 210; // A4 size in mm
            const pdfHeight = 200; // A4 size in mm

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdfRatio = pdfWidth / pdfHeight;
            const imgRatio = imgWidth / imgHeight;

            let pdfImgWidth, pdfImgHeight;
            if (imgRatio > pdfRatio) {
                pdfImgWidth = pdfWidth;
                pdfImgHeight = pdfWidth / imgRatio;
            } else {
                pdfImgHeight = pdfHeight;
                pdfImgWidth = pdfHeight * imgRatio;
            }

            const doc = new jsPDF('p', 'mm', 'a4'); // Portrait orientation
            doc.addImage(imgData, 'PNG', 0, 20, pdfImgWidth, pdfImgHeight);
            doc.text('Circle wise Rainfall of Maharashtra State (as compared to normal rain) for the month of Aug', 10, 10, {
              maxWidth: 190 // Ensure text fits within the PDF width
          });
            doc.save('MaharashtraStateRainfall.pdf');
        })
        .catch((error) => {
            console.error("Error generating map image:", error);
        });
    }, 1000); // Delay of 1 second
}





}
