import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehjun-dec',
  templateUrl: './tehjun-dec.component.html',
  styleUrls: ['./tehjun-dec.component.scss']
})
export class TehjunDecComponent implements OnInit {

  divisions:any;
  districts:any;
  reports:any= [];
  reportss:any= [];
  statereports:any=[];
  tehsildata:any=[];
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentmonth:string;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();
  companyId: string = '';

  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
    ,private route: ActivatedRoute
  ) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    this.currentmonth=monthNames[this.currentMonthIndex];
     for (let i = 5; i <= this.currentMonthIndex-1; i++) {
      this.months.push(monthNames[i]);
    }
    console.log(this.currentmonth,'currentmonth')
  }

 ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['company_id'] || '';
      this.getdivision();
    });
  }

  getdivision() {
    console.log(this.companyId, 'companyId');
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
      alert("please select state ")
     }
     else
     {
     this.currentreport.tehsilRangeReport(this.selectedDivision,this.selectedDistrict).subscribe((res) => {
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
               // tehsilJunseptNormal: tehsil.JunseptNormal,
                tehsilJunDecNormal: tehsil.JunDecNormal,
                monthlyData: tehsil.monthlyData,
              };
            });

          return {
            DistrictCode: district.DistrictCode,
            DistrictName: district.Districtname,
           // districtJunseptNormal: district.JunseptNormal,
            districtJunDecNormal: district.JunDecNormal,
            monthlyData: district.monthlyData.map((d: any) => {
              const monthData = division.monthlyData.find((data: any) => data.month === d.month);
              return {
                month: d.month,
                normalRainfall: d.normalRainfall,
                actualRainfall: d.actualRainfall,
                on_day: d.on_day,
                progressive: d.progressive,
                percentToNormal: d.percentToNormal,
                prevAvg: d.prevAvg,
                prev_precent: d.prev_precent,
                TotalMonthnormal: monthData ? monthData.TotalMonthnormal : null,
              };
            }),
            Tehsils: tehsilData,
          };
        });

      const divisionData: any = {
        DivisionCode: division.DivisionCode,
        DivisionName: division.DivisionName,
        DivisionJunDecNormal: division.JunDecNormal,
        monthlyData: division.monthlyData,
        Districts: districtData,
      };

      combinedData.push(divisionData);
    }

    console.log(combinedData, 'combinetehsil');
    return combinedData;
  }

  calculateTotal(dataArray: any[], key: string): number {
    const total = dataArray.reduce((acc, curr) => acc + curr[key], 0);
    console.log(total);
    return Number(total.toFixed(1));

  }

calculatePercentage(dataArray: any[]): number {
    const totalActual = this.calculateTotal(dataArray, 'progressive');
    const totalNormal = this.calculateTotal(dataArray, 'normalRainfall');

    // Avoid division by zero
    return totalNormal !== 0 ? (totalActual / totalNormal) * 100 : 0;
   }

calculatePrevPercentage(dataArray: any[]): number {
    const totalPreActual = this.calculateTotal(dataArray, 'prevAvg');
    const totalNormal = this.calculateTotal(dataArray, 'normalRainfall');

    // Avoid division by zero
    return totalNormal !== 0 ? (totalPreActual / totalNormal) * 100 : 0;
   }

   isCurrentMonth(month: number): boolean {
    return month === this.currentMonthIndex +1;
  }
    isJune(month: number): boolean {
     return month === 6;
    }
   downloadPdf() {
    this.printf.downloadTehsilReportPdf();
  }

  downloadExcel(): void {
   this.gexcel.downloadcurrentyearExcel();
  }

}
