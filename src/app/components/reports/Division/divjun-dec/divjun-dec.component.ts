import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divjun-dec',
  templateUrl: './divjun-dec.component.html',
  styleUrls: ['./divjun-dec.component.scss']
})
export class DivjunDecComponent implements OnInit {

  isOpen = false;
  junereports:any= [];
  statereports:any=[];
  currentmonth:string;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();
  today: Date = new Date();
  divisions: any;
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

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['company_id'] || '';

    });
    this.currentreport.divRangeReport(this.companyId).subscribe((res) => {
      this.junereports = res.divdata;
      this.statereports= res.statedata[0];
      console.log(this.junereports);
    });
  }


  calculateTotal(dataArray: any[], key: string): number {
        const total = dataArray.reduce((acc, curr) => acc + curr[key], 0);
        return Number(total.toFixed(1));
      }

  calculatePercentage(dataArray: any[]): number {
        const totalActual = this.calculateTotal(dataArray, 'progressive');
        const totalNormal = this.calculateTotal(dataArray, 'normalRainfall');
        return totalNormal !== 0 ? (totalActual / totalNormal) * 100 : 0;
       }


  calculatePrevPercentage(dataArray: any[]): number {
        const totalPreActual = this.calculateTotal(dataArray, 'prevAvg');
        const totalNormal = this.calculateTotal(dataArray, 'normalRainfall');
        return totalNormal !== 0 ? (totalPreActual / totalNormal) * 100 : 0;
       }

       isCurrentMonth(month: number): boolean {
        return month === this.currentMonthIndex + 1;
      }
       isJune(month: number): boolean {
     return month === 6;
    }

       downloadPdf() {
        this.printf.downloadReportsDivisionPdf();
      }

      downloadExcel(): void {
       this.gexcel.downloadcurrentyearExcel();
      }

}
