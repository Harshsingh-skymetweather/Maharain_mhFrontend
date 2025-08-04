import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distseason',
  templateUrl: './distseason.component.html',
  styleUrls: ['./distseason.component.scss']
})
export class DistseasonComponent implements OnInit {

  divisions:any;
  reports:any= [];
  statereports:any=[];

  selectedDivision: any = '';
  selectedState:any = '';

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
     for (let i = 5; i <= this.currentMonthIndex; i++) {
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
      this.currentreport.distRangeReport(this.selectedDivision,this.companyId).subscribe((res) => {
      this.statereports = res.statedata;
      this.reports = this.combineDivisionAndDistrictData(res.divdata, res.distdata);
      console.log(this.statereports, 'state');
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
          };
        });

      const divisionData: any = {
        DivisionCode: division.DivisionCode,
        DivisionName: division.DivisionName,
        monthlyData: division.monthlyData,
        Districts: districtData,
      };

      combinedData.push(divisionData);
    }

    console.log(combinedData, 'wwhqkwkdlj');
    return combinedData;
  }

  downloadPdf() {
    this.printf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.gexcel.downloadcurrentyearExcel();
  }


}

