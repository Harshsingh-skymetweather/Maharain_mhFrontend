import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';


import * as moment from 'moment';
@Component({
  selector: 'app-cicrle-dailyrain-period',
  templateUrl: './cicrle-dailyrain-period.component.html',
  styleUrls: ['./cicrle-dailyrain-period.component.scss']
})
export class CicrleDailyrainPeriodComponent implements OnInit {
getDistrictRowSpan(_t107: any) {
throw new Error('Method not implemented.');
}

  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];
  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedMonth:any='';
  divisions:any;
  selectedDistrict:any ='';
  valid:any='';
  object:any ={}
  fromDate:any='';
  toDate:any='';

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth= new Date().getMonth();
  monthNames:any=[];
  months: any[] = [];

  dates: (number|null)[] = [];
  datesData: string[] = [];


  currentMonthIndex: number = new Date().getMonth();
  todayDate: string='';
  companyId: string = '';
  constructor(private service:CommonService,
    private currentreort:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
  ) {


}

  ngOnInit(): void {
    this.getdivision();
    this.generateDates();
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  private generateDates(): void {
    if (this.selectedMonth) {
      const daysInMonth = new Date(this.currentYear, this.selectedMonth, 0).getDate();
      this.dates = Array.from({ length: daysInMonth }, (_, index) => {
        const date = index + 1;
        const currentDate = new Date(this.currentYear, this.selectedMonth - 1, date);
        if (currentDate <= this.today) {
          return date;
        } else {
          return null;
        }
      }).filter(date => date !== null);

      console.log(this.dates, 'datearray');
    }
    else{
      const daysInMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();
      this.dates = Array.from({ length: daysInMonth }, (_, index) => {
        const date = index + 1;
        const currentDate = new Date(this.currentYear, this.currentMonthIndex, date);
        if (currentDate <= this.today) {
          return (date);
        } else {
          return null;
        }
      }).filter(date => date !== null);

      console.log(this.dates,'datearray');
    }

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

    onSubmit() {
      this.valid = 'true'
      if(this.selectedState == ''){
       alert("please select state ")
      }
      else
      {
        this.getmonthrange();
        this.currentreort.circleDailyRaineriod(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.fromDate,this.toDate).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
      });
      }

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

    combineDivisionAndDistrictAndTehsilData(apiData: {
      distdata: { DistrictCode: string; Districtname: string; Normal:string; DateData: any }[];
      tehsildata: { DistrictCode: string; Tehsilcode: string; Tehsilname: string; Normal:string; DateData: any }[];
      cirdata: { DistrictCode: string; Tehsilcode: string; Circlecode: string; circlename: string; Normal:string; DateData: any }[];
    }): any[] {
      const modifiedData: { districts: any[] } = {
        districts: [],
      };

      for (const district of apiData.distdata) {
        const districtObject: any = {
          DistrictCode: district.DistrictCode,
          Districtname: district.Districtname,
          Normal:district.Normal,
          tehsils: [],
        };
        for (const tehsil of apiData.tehsildata.filter((t) => t.DistrictCode === district.DistrictCode)) {
          const tehsilObject: any = {
            Tehsilcode: tehsil.Tehsilcode,
            Tehsilname: tehsil.Tehsilname,
            Normal:tehsil.Normal,
            circles: [],
          };

          for (const circle of apiData.cirdata.filter(
            (c) => c.DistrictCode === district.DistrictCode && c.Tehsilcode === tehsil.Tehsilcode
          )) {
            const circleObject: any = {
              Circlecode: circle.Circlecode,
              circlename: circle.circlename,
              Normal:circle.Normal,
              DateData: circle.DateData,
            };
            tehsilObject.circles.push(circleObject);
          }

          tehsilObject.DateData = tehsil.DateData;
          districtObject.tehsils.push(tehsilObject);
        }


        districtObject.DateData = district.DateData;
        modifiedData.districts.push(districtObject);
      }
      return modifiedData.districts;
    }



    getRainValueForTehsil(teh: any, date: number | null): number {
      if (date === null) {
        return 0;
      }
      const dateData = teh.DateData.find((dd: any) => dd.date === date);
      return dateData ? dateData.rain : 0;
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


    getRainValuecircle(circle: any, date: number | null): number {
      if (date === null) {
        return 0;
      }
      const dateData = circle.DateData.find((dd:any) => dd.date === date);
      return dateData ? dateData.rain  : 0;
    }


    getcircleTotalRain(circle: any): number {
      if (!circle.DateData || circle.DateData.length === 0) {
        return 0;
      }

      return circle.DateData.reduce((total:any, dd:any) => total + dd.rain, 0);
    }

    getPercentageforcircle(circle: any): number {
      const totalRain = this.getcircleTotalRain(circle);
      const normalValue = circle.Normal;
      if (normalValue == 0.0) {
        console.log(normalValue,'cirnormal')
        return 0;
      }

      return (totalRain / normalValue) * 100;
    }

    getRainyDaysForCircle(circle: any): number {
      if (!circle.DateData || circle.DateData.length === 0) {
        return 0;
      }

      return circle.DateData.filter((dd: any) => dd.rain >= 2.5).length;
    }


    downloadPdf() {
      this.printf.downloadcirclePdf();
    }

    downloadExcel(): void {
     this.gexcel.downloadExcel();
    }



}
