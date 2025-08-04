import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divjun-sept',
  templateUrl: './divjun-sept.component.html',
  styleUrls: ['./divjun-sept.component.scss']
})
export class DivjunSeptComponent implements OnInit {

  isOpen = false;
  junereports:any= [];
  statereports:any=[];
  currentmonth:string;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();
  today: Date = new Date();
  companyId: string = '';
  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService
    ,private route: ActivatedRoute
  ) {
    const monthNames = ['Jun','Jul', 'Aug', 'Sept'
    ];

    this.currentmonth=monthNames[monthNames.length];
     for (let i = 0; i < monthNames.length-1; i++) {
      this.months.push(monthNames[i]);
    }

  }

  // ngOnInit(): void {
  //   this.currentreport.divRangeReport().subscribe((res) => {
  //     this.junereports = res.divdata;
  //     this.statereports= res.statedata[0];
  //     console.log(this.statereports,'junereport');
  //   });
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['company_id'] || '';
      console.log(this.companyId);
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
      return month === this.currentMonthIndex + 1;
    }


       downloadPdf() {
        this.printf.downloadReportsDivisionPdf();
      }

      downloadExcel(): void {
       this.gexcel.downloadcurrentyearExcel();
      }
}

