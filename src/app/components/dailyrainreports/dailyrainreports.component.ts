import { Component, OnInit } from '@angular/core';
import { PacketcountService } from 'src/app/service/misc/packetcount.service';

@Component({
  selector: 'app-dailyrainreports',
  templateUrl: './dailyrainreports.component.html',
  styleUrls: ['./dailyrainreports.component.scss']
})
export class DailyrainreportsComponent implements OnInit {
  selectedDivisionType: any = '';
  selectedDivision: any = '';
  selectedDistrict: any = '';
  selectedTehsil: any = '';
  selectedCircle: any = '';
  selectedstation: any = '';
  divisions: any;
  districts: any;
  tehsils: any;
  circles: any;
  stations: any;
  fromDate: any;
  toDate: any;
  result: any = '';

  constructor(private service: PacketcountService) { }

  ngOnInit(): void {}

  // This method will handle the CSV export logic
  onBtnExport() {
    if (!this.result || this.result.length === 0) {
      alert('No data available to export');
      return;
    }

    // Convert the result data into CSV format
    const csvData = this.convertToCSV(this.result);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
    
    // Create an anchor element and trigger the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'daily_rain_report.csv';  // Name of the CSV file
    document.body.appendChild(a);  // Append the anchor element to the document
    a.click();  // Trigger the download
    document.body.removeChild(a);  // Clean up by removing the anchor element
  }

  // Helper function to convert JSON data to CSV format
  convertToCSV(data: any) {
    const array = typeof data != 'object' ? JSON.parse(data) : data;
    let str = '';
    let headers = Object.keys(array[0]);
    str += headers.join(',') + '\r\n'; // Add headers to the CSV

    // Add data rows
    array.forEach((row: any) => {
      str += headers.map(fieldName => row[fieldName]).join(',') + '\r\n';
    });

    return str;
  }

  onChangeDistrict(ev: any) {
    this.selectedDistrict = ev.target.value;
    this.getTehsils();
  }

  getDistrict() {
    if (this.selectedDivisionType != '' && this.selectedDivision != null) {
      this.service.getdailydistrict(this.selectedDivisionType, this.selectedDivision).subscribe((res) => {
        this.districts = res;
      });
    }
  }

  getTehsils() {
    if (this.selectedDistrict != '' && this.selectedDistrict != null) {
      this.service.gettehsils(this.selectedDistrict).subscribe((res) => {
        this.tehsils = res;
        console.log(this.tehsils, 'tehsils')
      });
    }
    else {
      alert('please select district')
    }
  }

  getCircles() {
    if (this.selectedDistrict != '' && this.selectedTehsil != '') {
      this.service.getcircles(this.selectedDistrict, this.selectedTehsil).subscribe((res) => {
        this.circles = res;
        console.log(this.circles, 'circles')
      });
    }
    else {
      alert('please select tehsil');
    }
  }

  onChangeDivtype(ev: any) {
    this.selectedDivisionType = ev.target.value;
    this.getdivision();
  }

  getdivision() {
    if (this.selectedDivisionType != '') {
      console.log(this.selectedDivisionType, 'shjm')
      this.service.getDivision(this.selectedDivisionType).subscribe((res) => {
        this.divisions = res;
        console.log(this.divisions, 'divisions')
      });
    }
    else {
      alert('please select Division Type');
    }
  }

  onChangeDivision(ev: any) {
    this.selectedDivision = ev.target.value;
    this.getDistrict();
  }

  onChangeTehsil(ev: any) {
    this.selectedTehsil = ev.target.value;
    this.getCircles();
  }

  getstation() {
    if (this.selectedDistrict != '' && this.selectedTehsil != '' && this.selectedCircle != '') {
      this.service.getstation(this.selectedDistrict, this.selectedTehsil, this.selectedCircle).subscribe((res) => {
        this.stations = res;
        console.log(this.stations, 'stations')
      });
    }
    else {
      alert('please select tehsil');
    }
  }

  onChangeCircle(ev: any) {
    this.selectedCircle = ev.target.value;
    this.getstation();
  }

  onSubmit() {
    if (this.selectedDivision && this.selectedDistrict && this.fromDate && this.toDate) {
      console.log(this.selectedDivision, 'this.selectedDivision')
      console.log(this.selectedDistrict, 'this.selectedDistrict')
      this.service.getdailyRainReport(this.selectedDivision, this.selectedDistrict, this.selectedTehsil, this.selectedCircle, this.selectedstation, this.fromDate, this.toDate).subscribe((res) => {
        this.result = res;
        console.log(this.result, 'result')
      });
    }
    else if (this.selectedDivision == '') {
      alert('please select division');
    }
    else if (this.selectedDistrict == '') {
      alert('please select district');
    }
  }
}
