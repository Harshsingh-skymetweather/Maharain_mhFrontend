import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
@Component({
  selector: 'app-june-december',
  templateUrl: './june-december.component.html',
  styleUrls: ['./june-december.component.scss']
})
export class JuneDecemberComponent implements OnInit {

  isOpen = false;
  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];
  selectedDivision: any = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any ='';

  companyId:any='';
  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth:string;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();

  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
        ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
  ) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    this.currentmonth=monthNames[this.currentMonthIndex];
     for (let i = 5; i <= this.currentMonthIndex -1; i++) {
      this.months.push(monthNames[i]);
    }
    console.log(this.currentmonth,'currentmonth')
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
        console.log(this.selectedDivision,'selecteddivsion');
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
        console.log(this.selectedDivision,'selecteddivsion');
        console.log(this.selectedDistrict,'selecteddistrict');
       this.currentreport.circleRangeReport(this.selectedDivision,this.selectedDistrict).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
        console.log(this.result,'result');
      });
      }
    }
    combineDivisionAndDistrictAndTehsilData(apiData: {
      distdata: { DistrictCode: string; Districtname: string; monthlyData: any }[];
      tehsildata: { DistrictCode: string; Tehsilcode: string; Tehsilname: string; monthlyData: any }[];
      cirdata: { DistrictCode: string; Tehsilcode: string; Circlecode: string; circlename: string; monthlyData: any }[];
    }): any[] {
      const modifiedData: { districts: any[] } = {
        districts: [],
      };

      // Iterate through each district
      for (const district of apiData.distdata) {
        const districtObject: any = {
          DistrictCode: district.DistrictCode,
          Districtname: district.Districtname,
          tehsils: [],
        };

        // Iterate through each tehsil in the district
        for (const tehsil of apiData.tehsildata.filter((t) => t.DistrictCode === district.DistrictCode)) {
          const tehsilObject: any = {
            Tehsilcode: tehsil.Tehsilcode,
            Tehsilname: tehsil.Tehsilname,
            circles: [],
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

          // Add tehsil data to the district
          tehsilObject.monthlyData = tehsil.monthlyData;
          districtObject.tehsils.push(tehsilObject);
        }

        // Add district data to the main structure
        districtObject.monthlyData = district.monthlyData;
        modifiedData.districts.push(districtObject);
      }

      // Return the result
      return modifiedData.districts;
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
     isJune(month: number): boolean {
     return month === 6;
    }


     downloadPdf() {
      this.printf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.gexcel.downloadcurrentyearExcel();
    }
}
