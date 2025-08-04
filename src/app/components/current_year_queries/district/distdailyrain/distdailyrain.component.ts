import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distdailyrain',
  templateUrl: './distdailyrain.component.html',
  styleUrls: ['./distdailyrain.component.scss']
})
export class DistdailyrainComponent implements OnInit {

  districts: any;
  apiData: any = [];
  reports: any = [];
  result: any = [];
  selectedYear: any = '';
  selectedDivision: any = '';
  selectedState: any = '';
  selectedMonth: any = '';
  divisions: any;
  selectedDistrict: any = '';

  object: any = {}
  @Input() monthChecked = false

  statereport: any[] = [];
  dates: (number | null)[] = [];
  datesData: string[] = [];
  report: any[] = [];

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();

  selectedMonthmonthes: any;
  arraymonth: any = [];
  companyId: string = '';

  constructor(private service: CommonService,
    private printf: PrintPDFService,
    private gexcel: GenerateexcelService) {
  }

  ngOnInit(): void {
    this.getdivision();
    this.generatemonths();
  }

  generatemonths() {
    this.currentMonthIndex = new Date().getMonth();
    var monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < monthes.length; i++) {
      if (i === (this.currentMonthIndex) + 1) { break; }
      this.selectedMonthmonthes = {
        name: monthes[i],
        value: i + 1
      }
      this.arraymonth.push(this.selectedMonthmonthes)
    }
  }

  private generateDates(): void {
    let selectedMonth = this.currentMonthIndex + 1;
    const daysInMonth = new Date(this.currentYear, selectedMonth, 0).getDate();
    this.dates = Array.from({ length: daysInMonth }, (_, index) => {
      const date = index + 1;
      const currentDate = new Date(this.currentYear, selectedMonth - 1, date);
      if (currentDate <= this.today) {
        return date;
      } else {
        return null;
      }
    }).filter(date => date !== null);

    console.log(this.dates, 'datearray');
  }

  getdivision() {
    this.service.getcompanydivisions().subscribe((res) => {
      this.divisions = res;
      console.log(this.divisions, 'division');
    });
  }

  onChangedivision(ev: any) {
    this.getDistrict(ev.target.value);
    this.selectedDivision = ev.target.value;
  }

  getDistrict(title: any) {
    this.service.getDistrict(title).subscribe((res) => {
      this.districts = res;
    });
  }

  getDistrictName(districtCode: string): string {
    const selectedDistrictData = this.districts.find((district: any) => district.district === districtCode);
    return selectedDistrictData ? selectedDistrictData.district_name : '';
  }

  getDivisionName(divisionCode: string): string {
    const selectedDivisionData = this.divisions.find((division: any) => division.division_code === divisionCode);
    return selectedDivisionData ? selectedDivisionData.division_name : '';
  }

  onSubmit() {
    console.log(this.selectedMonth, "selectedMonth")
    if (this.selectedState == '') {
      alert("Please Select State ")
    }
    else {
      this.generateDates();
      this.service.Districtdailyrainasday(this.selectedDivision, this.selectedDistrict, this.selectedMonth).subscribe((res) => {
        this.report = res;
        this.statereport = res.statedata;
        this.report = this.combineDivisionAndDistrictData(res.divdata, res.distdata);
        console.log(this.report, 'reportdata');
      });
    }
  }

  combineDivisionAndDistrictData(divdata: any[], distdata: any[]): any[] {
    const combinedData: any[] = [];
    for (const division of divdata) {
      const districtData: any[] = distdata
        .filter((district) => district.DivisionCode === division.DivisionCode)
        .map((district) => {
          return {
            DistrictCode: district.DistrictCode,
            DistrictName: district.Districtname,
            DateData: district.DateData,
            Normal: district.Normal
          };
        });

      const divisionData: any = {
        DivisionCode: division.DivisionCode,
        DivisionName: division.DivisionName,
        DateData: division.DateData,
        Normal: division.Normal,
        Districts: districtData,
      };
      combinedData.push(divisionData);
    }

    return combinedData;
  }

  getRainValue(division: any, date: number | null): number {
    if (date === null) {
      return 0;
    }
    const dateData = division.DateData.find((dd: any) => dd.date === date);
    return dateData ? dateData.rain : 0;
  }

  getDivisionTotalRain(division: any): number {
    if (!division.DateData || division.DateData.length === 0) {
      return 0;
    }

    return division.DateData.reduce((total: any, dd: any) => total + dd.rain, 0);
  }

  getPercentage(division: any): number {
    const totalRain = this.getDivisionTotalRain(division);
    const normalValue = division.Normal;

    if (normalValue === 0) {
      return 0; // Avoid division by zero
    }

    return (totalRain / normalValue) * 100;
  }

  getRainyDays(division: any): number {
    if (!division.DateData || division.DateData.length === 0) {
      return 0;
    }

    return division.DateData.filter((dd: any) => dd.rain >= 2.5).length;
  }

  downloadPdf() {
    this.printf.GeneratedistrictPdF();
  }

  downloadExcel(): void {
    this.gexcel.downloadExcel();
  }
}
