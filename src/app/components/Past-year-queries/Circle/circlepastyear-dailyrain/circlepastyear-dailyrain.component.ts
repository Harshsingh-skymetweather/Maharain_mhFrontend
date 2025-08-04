import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circlepastyear-dailyrain',
  templateUrl: './circlepastyear-dailyrain.component.html',
  styleUrls: ['./circlepastyear-dailyrain.component.scss']
})
export class CirclepastyearDailyrainComponent implements OnInit {

  selectedState:any='';
  selectedDivision:any='';
  selectedYear: any = '';
  selectedMonth: any ='';
  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];

  divisions:any;
  selectedDistrict:any ='';
  valid:any='';
  object:any ={}

  years: number[] = this.generateYears(1998, new Date().getFullYear() -1);
  months: { value: string, name: string }[] = [
    {name:'Jan', value:'1'},
    {name:'Feb', value:'2'},
    {name:'Mar', value:'3'},
    {name:'Apr', value:'4'},
    {name:'May', value:'5'},
    {name:'Jun', value:'6'},
    {name:'Jul', value:'7'},
    {name:'Aug', value:'8'},
    {name:'Sept', value:'9'},
    {name:'Oct', value:'10'},
    {name:'Nov', value:'11'},
    {name:'Dec', value:'12'}
  ];

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth= new Date().getMonth();
  monthNames:any=[];

  dates: (number|null)[] = [];
  datesData: string[] = [];


  currentMonthIndex: number = new Date().getMonth();

  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {
    const currentMonthIndex = new Date().getMonth();
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sept', 'Oct', 'Nov', 'Dec'
    ];
    const monthObject: Record<string, number> = {};
    for (let i = 0; i <= currentMonthIndex; i++) {
      const monthName = months[i];
      const monthValue = i + 1;
      monthObject[monthName] = monthValue;
    }
    Object.entries(monthObject).forEach(([key, value]) => {
    this.object ={
    name:key,
    value:value
  }
    });
   console.log(this.object,)
}

  ngOnInit(): void {
    this.getdivision();
    this.generateDates();
  }
  private generateDates(): void {
    if (this.selectedYear && this.selectedMonth) {
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.dates = Array.from({ length: daysInMonth }, (_, index) => {
        const date = index + 1;
        const currentDate = new Date(this.selectedYear, this.selectedMonth - 1, date);
        if (currentDate <= this.today) {
          return date;
        } else {
          return null;
        }
      }).filter(date => date !== null);

      console.log(this.dates, 'datearray');
    }
  }

  onMonthChange(): void {
    this.generateDates();
  }

  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let i = end; i >= start; i--) {
      years.push(i);
    }
    return years;
  }
  onYearChange() {
    this.selectedMonth = '';
  }


  getdivision() {
    this.service.getDivisions().subscribe((res) => {
     this.divisions = res;
            console.log(this.divisions,'division');
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
        console.log(this.selectedYear,'year')
        console.log(this.selectedMonth,'selectedmonth')
        this.service.circleDailyRain(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
        console.log(this.result,'result');
      });

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


    // getRainValuecircle(circle: any, date: number | null): number {
    //   if (date == null) {
    //     return 0;
    //   }
    //   const dateData = circle.DateData.find((dd:any) => dd.date === date);
    //   return dateData ? dateData.rain  : 0;
    // }

     getRainValuecircle(circle: any, date: number | null): string | number {
      if (date == null) {
        return '-';
      }
      if(circle.DateData.length==0)
      {
        return '-';
      }
      else{
        const dateData = circle.DateData.find((dd: any) => dd.date === date);
        return dateData ? dateData.rain.toFixed(1) : '0.0';
      }

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
      this.printpdf.downloadcirclePdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadcurrentyearExcel();
    }

}
