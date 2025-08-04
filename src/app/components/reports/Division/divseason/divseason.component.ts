import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divseason',
  templateUrl: './divseason.component.html',
  styleUrls: ['./divseason.component.scss']
})
export class DivseasonComponent implements OnInit {

  junereports:any= [];
  statereports:any= [];
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

  // ngOnInit(): void {
  //   this.currentreport.divRangeReport().subscribe((res) => {
  //     this.junereports = res.divdata;
  //     this.statereports= res.statedata[0];
  //     console.log(this.junereports);
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
  downloadPdf() {
    this.printf.downloadReportsDivisionPdf();
  }

  downloadExcel(): void {
   this.gexcel.downloadcurrentyearExcel();
  }


}
