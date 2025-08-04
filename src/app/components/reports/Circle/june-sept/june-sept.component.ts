import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';


@Component({
  selector: 'app-june-sept',
  templateUrl: './june-sept.component.html',
  styleUrls: ['./june-sept.component.scss']
})
export class JuneSeptComponent implements OnInit {

  isOpen = false;
  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];
  selectedDivision: any = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any = '';
  companyId:any='';

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth:any;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();

  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
  )
   {
    const monthNames = ['Jun','Jul', 'Aug', 'Sept'
    ];
    this.currentmonth=monthNames.length;
     for (let i = 0; i < this.currentmonth-1; i++) {
      this.months.push(monthNames[i]);
    }
  }

  ngOnInit(): void {
    this.getdivision();
  }

  getdivision() {
    console.log(this.companyId,'svxgaskjjx');
     this.service.getDivisionsC(this.companyId).subscribe((res) => {
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
         console.log(this.districts)
       });
     }
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
      if(this.selectedState == ''){
        alert("please select state")
       }
       else
       {

      this.currentreport.circleJunseptReport(this.selectedDivision,this.selectedDistrict).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
        console.log(this.result,'result');
      });
    }
    }


    combineDivisionAndDistrictAndTehsilData(apiData: {
      divdata: { DivisionCode: string; DivisionName: string; monthlyData: any }[];
      distdata: { DivisionCode: string; DistrictCode: string; Districtname: string; monthlyData: any }[];
      tehsildata: { DistrictCode: string; Tehsilcode: string; Tehsilname: string; monthlyData: any }[];
      cirdata: { DistrictCode: string; Tehsilcode: string; Circlecode: string; circlename: string; monthlyData: any }[];
    }): any[] {
      const modifiedData: { divisions: any[] } = {
        divisions: [],
      };

      // Iterate through each division
      for (const division of apiData.divdata) {
        const divisionObject: any = {
          DivisionCode: division.DivisionCode,
          DivisionName: division.DivisionName,
          districts: [],
          monthlyData: division.monthlyData
        };

        // Iterate through each district in the division
        for (const district of apiData.distdata.filter((d) => d.DivisionCode === division.DivisionCode)) {
          const districtObject: any = {
            DivisionCode: district.DivisionCode,
            DistrictCode: district.DistrictCode,
            Districtname: district.Districtname,
            tehsils: [],
            monthlyData: district.monthlyData
          };

          // Iterate through each tehsil in the district
          for (const tehsil of apiData.tehsildata.filter((t) => t.DistrictCode === district.DistrictCode)) {
            const tehsilObject: any = {
              Tehsilcode: tehsil.Tehsilcode,
              Tehsilname: tehsil.Tehsilname,
              circles: [],
              monthlyData: tehsil.monthlyData
            };

            // Iterate through each circle in the tehsil
            for (const circle of apiData.cirdata.filter(
              (c) => c.DistrictCode === district.DistrictCode && c.Tehsilcode === tehsil.Tehsilcode
            )) {
              const circleObject: any = {
                Circlecode: circle.Circlecode,
                circlename: circle.circlename,
                monthlyData: circle.monthlyData,
              };
              tehsilObject.circles.push(circleObject);
            }

            districtObject.tehsils.push(tehsilObject);
          }

          divisionObject.districts.push(districtObject);
        }

        modifiedData.divisions.push(divisionObject);
      }

      return modifiedData.divisions;
    }


    calculateTotal(dataArray: any[], key: string): number {
      const total = dataArray.reduce((acc, curr) => acc + curr[key], 0);
      return Number(total.toFixed(1));
    }

    calculatePercentage(dataArray: any[]): number {
      const totalActual = this.calculateTotal(dataArray, 'progressive');
      const totalNormal = this.calculateTotal(dataArray, 'normalRainfall');

      // Avoid division by zero
      return totalNormal !== 0 ? (totalActual / totalNormal) * 100 : 0;
    }

    isCurrentMonth(month: number): boolean {
      return month === this.currentMonthIndex + 1;
    }
    getLatestMonth(data: any[]): number | null {
  if (!data || data.length === 0) return null;
  return Math.max(...data.map(d => d.month));
}

isLatestMonth(month: number, data: any[]): boolean {
  const latestMonth = this.getLatestMonth(data);
  return latestMonth !== null && month === latestMonth;
}
getAvailableMonths(data: any[]): number[] {
  if (!data || data.length === 0) return [];
  // Use Set to remove duplicates and sort by month number
  return [...new Set(data.map(d => d.month))].sort((a, b) => a - b);
}

getMonthName(month: number): string {
  const monthMap: { [key: number]: string } = {
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September'
  };
  return monthMap[month] || `Month-${month}`;
}


    downloadPdf() {
      this.printf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.gexcel.downloadcurrentyearExcel();
    }


}
