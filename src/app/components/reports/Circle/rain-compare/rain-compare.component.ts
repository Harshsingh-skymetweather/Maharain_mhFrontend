import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
@Component({
  selector: 'app-rain-compare',
  templateUrl: './rain-compare.component.html',
  styleUrls: ['./rain-compare.component.scss']
})
export class RainCompareComponent implements OnInit {

  isOpen = false;
  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];
  selectedDivision: any = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any ='';
  selectedMonth:any ='';
  today: Date = new Date();
  currentYear = new Date().getFullYear();
  previousYear =  this.currentYear-1;

  selectedMonthmonthes: any;
  arraymonth: any = [];
  currentMonthIndex: any;

  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.getdivision();
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

  get selectedMonthDate(): Date {
    return new Date(new Date().getFullYear(), this.selectedMonth - 1);
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
       if(this.selectedState == ''){
        alert("please select state ")
       }
       else
       {
        console.log(this.selectedMonth,'selectedMonth');
       this.currentreport.circlereortcomare(this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res: any[]) => {
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

    downloadPdf() {
      this.printf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.gexcel.downloadcurrentyearExcel();
    }

}
