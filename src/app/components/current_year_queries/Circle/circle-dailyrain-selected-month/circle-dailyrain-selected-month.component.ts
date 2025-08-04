import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-circle-dailyrain-selected-month',
  templateUrl: './circle-dailyrain-selected-month.component.html',
  styleUrls: ['./circle-dailyrain-selected-month.component.scss']
})
export class CircleDailyrainSelectedMonthComponent implements OnInit {
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
 @Input() monthCheched = false

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth= new Date().getMonth();
  monthNames:any=[];

  dates: (number|null)[] = [];
  datesData: string[] = [];
  months: string[] = [];

  currentMonthIndex: number = new Date().getMonth();

  selectedMonthmonthes: any;
  arraymonth: any = [];
  companyId: string = '';
  constructor(private service:CommonService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
    ,private route: ActivatedRoute) {

}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['company_id'] || '';
      console.log(this.companyId);
    });
    this.getdivision();
    this.generateDates();
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
    console.log(this.companyId,'svxgaskjjx');
     this.service.getcompanydivisions().subscribe((res) => {
      this.divisions = res;
       });
  }

   onChangedivision(ev: any) {
    this.getDistrict(ev.target.value);
       this.selectedDivision = ev.target.value;
       console.log(this.selectedDivision,'selecteddivsion');
    }

    getDistrict(title: any) {
     this.service.getDistrict(title).subscribe((res) => {
        this.districts = res;
        console.log(this.districts)
      });
    }

    onSubmit() {
      console.log(this.selectedMonth,"selectedMonth")
      this.valid = 'true'

      if(this.selectedState == ''){
       alert("please select state ")
      }
      else
      {
      this.generateDates();
        this.service.circleDailyRain(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
        console.log(this.result,'result');
      });
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
              Normal:tehsil.Normal,
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
