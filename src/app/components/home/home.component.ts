import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PacketcountService } from 'src/app/service/misc/packetcount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private map: L.Map | undefined;
  stations: any;

  constructor(private packetcount: PacketcountService) { }

  ngOnInit(): void {
    // Initialize the map
    this.map = L.map('map', {
      zoomControl: true,
      minZoom: 7,
      maxZoom: 8
    }).setView([18.525319, 77.526301], 7);

    const bounds = new L.LatLngBounds(new L.LatLng(36.14, 65.95), new L.LatLng(0.34, 101.01));
    this.map.setMaxBounds(bounds);

    const imageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
      .addTo(this.map);

    const boundariesAndPlacesLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}')
      .addTo(this.map);

    // Adding Custom WMS Layers
    L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:india_white_view',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver'
    }).addTo(this.map);

    L.tileLayer.wms('http://geo.skymetweather.com:8081/geoserver/cite/wms', {
      layers: 'cite:india_state_web,cite:india_state_web_mask',
      transparent: true,
      format: 'image/png',
      serverType: 'geoserver',
      CQL_FILTER: "state_name in( 'Maharashtra' ) ; state_name not in( 'Maharashtra' )",
      opacity: 0.4
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/img/inactive.png',
      iconSize: [13, 20]
    });

    // Fetch station data only once
    this.packetcount.getstations().subscribe((stationsResponse) => {
      this.stations = stationsResponse;
      console.log(this.stations, 'stations');

      this.stations.forEach((station: any) => {
        const lat = parseFloat(station.latitude);
        const lon = parseFloat(station.longitude);

        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(this.map!);
        marker.on('click', () => {

          this.packetcount.getforecast(station.station_id).subscribe((forecastResponse: any) => {
            const stationForecast = forecastResponse.data.forecast;
            console.log('Station Forecast:', stationForecast);

            marker.bindPopup(this.generateForecastHTML(station, stationForecast), { maxWidth: 320 }).openPopup();
          });
        });
      });
    });
  }

  generateForecastHTML(station: any, forecast: any[]): string {
    let popupHTML = `
      <div style="font-size: 14px; color: #fff; background-color: rgba(0, 0, 0, 0.7); padding: 10px; border-radius: 8px; width: 300px;">
        <!-- Station Data -->
        <div style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">
          <h3 style="margin: 0; font-size: 16px; color: #90EE90;">Station Data</h3>
          <p style="margin: 0;"><b>Station:</b> ${station.name}</p>
          <p style="margin: 0;"><b>Date:</b> ${new Date().toISOString().split('T')[0]}</p>
          <p style="margin: 0;"><b>Time:</b> ${new Date().toLocaleTimeString()}</p>
        </div>

        <!-- Forecast -->
        <div>
          <h3 style="margin: 0; font-size: 16px; color: #90EE90;">Forecast</h3>
    `;

    if (forecast && forecast.length > 0) {
      forecast.slice(0, 3).forEach((day: any) => {
        popupHTML += `
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="flex: 1;">
              <p style="margin: 0;"><b>${day.weekday} (${day.date})</b></p>
              <p style="margin: 0;"><b>Temp:</b> ${day.temp_min}°C / ${day.temp_max}°C</p>
              <p style="margin: 0;"><b>Humidity:</b> ${day.rh_min}% / ${day.rh_max}%</p>
              <p style="margin: 0;"><b>Rain:</b> ${day.raintext} (${day.rain_qty}mm)</p>
            </div>
            <div style="text-align: center;">
              <img src="assets/img/sunny.png" alt="Weather" style="width: 40px; height: 40px;" />
              <p style="margin: 0; font-size: 14px;">${day.temp_max}°C</p>
            </div>
          </div>
        `;
      });
    } else {
      popupHTML += `<p style="margin: 0; color: #ff0000;">No forecast data available</p>`;
    }

    popupHTML += `</div></div>`;
    return popupHTML;
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
