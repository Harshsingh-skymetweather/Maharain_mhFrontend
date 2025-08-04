import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import * as moment from 'moment';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehsil-dailyrain-forperiod',
  templateUrl: './tehsil-dailyrain-forperiod.component.html',
  styleUrls: ['./tehsil-dailyrain-forperiod.component.scss']
})
export class TehsilDailyrainForperiodComponent implements OnInit {
  divisions: any;
  districts: any;
  reports: any = [];
  statereports: any = [];
  today: Date = new Date();

  currentYear = new Date().getFullYear();
  selectedYear: any = '';
  selectedMonth: any = '';
  selectedDivision: any = '';
  selectedState: any = '';
  selectedDistrict: any = '';
  monthlyData: { name: string, days: number[] }[] = [];
  fromDate: any;
  toDate: any;

  object: any = {}

  dateRange: string[] = [];
  months: any[] = [];

  dates: (number | null)[] = [];
  datesData: string[] = [];
  report: any[] = [];
  currentMonthIndex: number = new Date().getMonth();

  todayDate: string='';
  companyId: string = '';

  constructor(private service: CommonService,
    private currentreort: CurrentreportService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.getdivision();
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];

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
    console.log(this.selectedDivision, 'selecteddivsion');
  }

  getDistrict(title: any) {
    this.service.getDistrict(title).subscribe((res) => {
      this.districts = res;
      console.log(this.districts)
    });
  }

  //getDistrictname
  getDistrictName(districtCode: string): string {
    const selectedDistrictData = this.districts.find((district: any) => district.district === districtCode);
    return selectedDistrictData ? selectedDistrictData.district_name : '';
  }

  //getDivisionname
  getDivisionName(divisionCode: string): string {
    const selectedDivisionData = this.divisions.find((division: any) => division.division_code === divisionCode);
    return selectedDivisionData ? selectedDivisionData.division_name : '';
  }

  onSubmit() {
    if (!this.fromDate || !this.toDate) {
      alert("Please select both 'From Date' and 'To Date'");
      return;
    }

    if (this.selectedState == '') {
      alert("Please select state");
    } else {
      this.getmonthrange();
      this.service.TehsilRangeReport(this.selectedDivision, this.selectedDistrict, this.fromDate, this.toDate).subscribe((res) => {
        console.log(res);
        this.reports = this.combineDistrictAndTehsilData(res.distdata, res.tehsildata);
        console.log(this.reports, 'combineddata');
      });
    }
  }

  combineDistrictAndTehsilData(distdata: any[], tehsilarray: any[]): any[] {
    const combinedData: any[] = [];
    for (const district of distdata) {
      const tehsilData: any[] = tehsilarray
        .filter((tehsil) => tehsil.DistrictCode === district.DistrictCode)
        .map((tehsil) => {
          return {
            TehsilCode: tehsil.Tehsilcode,
            TehsilName: tehsil.Tehsilname,
            DateData: tehsil.DateData,
          };
        });
      const districtData: any = {
        DistrictCode: district.DistrictCode,
        DistrictName: district.Districtname,
        DateData: district.DateData,
        Tehsils: tehsilData,
      };

      combinedData.push(districtData);
    }

    return combinedData;
  }

  getmonthrange() {
    if (this.fromDate && this.toDate) {
      const start = moment(this.fromDate);
      const end = moment(this.toDate);
      const dateRange: string[] = [];

      while (start <= end) {
        dateRange.push(start.format('YYYY-MM-DD'));
        start.add(1, 'days');
      }

      const groupedByMonth = dateRange.reduce((acc: { [key: string]: string[] }, date: string) => {
        const month = moment(date).format('MMMM');
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(moment(date).format('DD'));
        return acc;
      }, {});

      this.months = Object.keys(groupedByMonth).map(month => ({
        name: month,
        days: groupedByMonth[month]
      }));
      console.log(this.months);
    }
  }

  getRainyDaysForTehsil(teh: any): number {
    if (!teh.DateData || teh.DateData.length === 0) {
      return 0;
    }

    return teh.DateData.filter((dd: any) => dd.rain >= 2.5).length;
  }

  getRainyDaysForDistrict(dist: any): number {
    if (!dist.DateData || dist.DateData.length === 0) {
      return 0;
    }

    return dist.DateData.filter((dd: any) => dd.rain >= 2.5).length;
  }

  downloadPdf() {
    console.log('pdf')
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadcurrentyearExcel();
  }
}
