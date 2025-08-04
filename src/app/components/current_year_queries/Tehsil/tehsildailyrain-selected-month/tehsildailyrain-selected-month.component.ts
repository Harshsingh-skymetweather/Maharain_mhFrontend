import { Component,Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehsildailyrain-selected-month',
  templateUrl: './tehsildailyrain-selected-month.component.html',
  styleUrls: ['./tehsildailyrain-selected-month.component.scss']
})
export class TehsildailyrainSelectedMonthComponent implements OnInit {
  divisions:any;
  districts:any;
  reports:any= [];
  statereports:any=[];
  today: Date = new Date();
  currentYear = new Date().getFullYear();
  selectedYear: any = '';
  selectedMonth: any ='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';

  object:any ={}


  dates: (number|null)[] = [];
  datesData: string[] = [];
  report: any[] = [];
  currentMonthIndex: number = new Date().getMonth();

  selectedMonthmonthes: any;
  arraymonth: any = [];
  companyId: string = '';

  constructor(private service:CommonService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
    ,private currentqueris:CurrentqueriesService)
    {

}

  ngOnInit(): void {
    this.getdivision();
   // this.generateDates();
    this.generatemonths();
  }

  generatemonths()
  {
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

    let selectedMonth = this.selectedMonth ? this.selectedMonth : this.currentMonthIndex + 1;
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
    console.log(this.selectedMonth, "selectedMonth")
    if (this.selectedState == '') {
      alert("Please Select State ")
    }
    else if (this.selectedMonth == '') {
      alert("Please Select Month")
    }
    else {
      this.generateDates()
      this.currentqueris.TehsilDailyrain(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res) => {
        this.statereports = res.statedata;
        this.reports = this.combineDivisionAndDistrictAndTehsilData(res.divdata, res.distdata,res.tehsildata);
      });
    }
    }

  combineDivisionAndDistrictAndTehsilData(divdata: any[], distdata: any[], tehsilarray: any[]): any[] {
    const combinedData: any[] = [];
    for (const division of divdata) {
      const districtData: any[] = distdata
        .filter((district) => district.DivisionCode === division.DivisionCode)
        .map((district) => {
          const tehsilData: any[] = tehsilarray
            .filter((tehsil) => tehsil.DistrictCode === district.DistrictCode)
            .map((tehsil) => {
              return {
                TehsilCode: tehsil.Tehsilcode,
                TehsilName: tehsil.Tehsilname,
                Normal:tehsil.Normal,
                DateData: tehsil.DateData,
              };
            });

          return {
            DistrictCode: district.DistrictCode,
            DistrictName: district.Districtname,
            Normal:district.Normal,
            DateData: district.DateData,
            Tehsils: tehsilData,
          };
        });

      const divisionData: any = {
        DivisionCode: division.DivisionCode,
        DivisionName: division.DivisionName,
        Normal:division.Normal,
        DateData: division.DateData,
        Districts: districtData,
      };

      combinedData.push(divisionData);
    }

    return combinedData;
  }

  getRainValueForTehsil(teh: any, date: number | null): number | string {
    if (date === null) {
      return '-';
    }
    const dateData = teh.DateData.find((dd: any) => dd.date === date);
    if (dateData) {
      return dateData.rain;
    } else {
      return '-';
    }
  }


  getTehsilTotalRain(teh: any): number {
    if (!teh.DateData || teh.DateData.length === 0) {
      return 0;
    }

    return teh.DateData.reduce((total: any, dd: any) => total + dd.rain, 0);
  }

  getPercentageForTehsil(teh: any): number {
    const totalRain = this.getTehsilTotalRain(teh);
    const normalValue = teh.Normal;

    if (normalValue == 0.0) {
      return 0; // Avoid division by zero
    }

    return (totalRain / normalValue) * 100;
  }

  getRainyDaysForTehsil(teh: any): number {
    if (!teh.DateData || teh.DateData.length === 0) {
      return 0;
    }

    return teh.DateData.filter((dd: any) => dd.rain >= 2.5).length;
  }

  getRainValueForDistrict(dist: any, date: number | null): number {
    if (date === null) {
      return 0;
    }
    const dateData = dist.DateData.find((dd: any) => dd.date === date);
    return dateData ? dateData.rain : 0;
  }

  getDistrictTotalRain(dist: any): number {
    if (!dist.DateData || dist.DateData.length === 0) {
      return 0;
    }

    return dist.DateData.reduce((total: any, dd: any) => total + dd.rain, 0);
  }

  getPercentageForDistrict(dist: any): number {
    const totalRain = this.getDistrictTotalRain(dist);
    const normalValue = dist.Normal;

    if (normalValue == 0.0) {
      return 0; // Avoid division by zero
    }

    return (totalRain / normalValue) * 100;
  }

  getRainyDaysForDistrict(dist: any): number {
    if (!dist.DateData || dist.DateData.length === 0) {
      return 0;
    }

    return dist.DateData.filter((dd: any) => dd.rain >= 2.5).length;
  }


  getRainValue(division: any, date: number | null): number {
    if (date === null) {
      return 0;
    }
    const dateData = division.DateData.find((dd:any) => dd.date === date);
    return dateData ? dateData.rain  : 0;
  }


  getDivisionTotalRain(division: any): number {
    if (!division.DateData || division.DateData.length === 0) {
      return 0;
    }

    return division.DateData.reduce((total:any, dd:any) => total + dd.rain, 0);
  }

  getPercentage(division: any): number {
    const totalRain = this.getDivisionTotalRain(division);
    const normalValue = division.Normal;

    if (normalValue == 0.0) {
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
    this.printf.downloadTehsilPdf();
  }

  downloadExcel(): void {
   this.gexcel.downloadExcel();
  }

}

