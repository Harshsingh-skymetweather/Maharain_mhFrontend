import { Component, OnInit } from '@angular/core';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divjun-report',
  templateUrl: './divjun-report.component.html',
  styleUrls: ['./divjun-report.component.scss']
})
export class DivjunReportComponent implements OnInit {

  //isOpen = false;
  junereports:any= [];
  statereports:any=[];
  currentmonth:string;
  months: string[] = [];
  currentMonthIndex: number = new Date().getMonth();
  today: Date = new Date();
  currentYear = new Date().getFullYear();
  previousYear =  this.currentYear-1;
  companyId: string = '';
  constructor(private service:CurrentreportService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService,
    private route: ActivatedRoute
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

  // ngOnInit(): void {
  //   this.service.divjuneReport().subscribe((res) => {
  //     this.junereports = res.divdata;
  //     this.statereports= res.statedata[0];
  //     console.log(this.junereports);
  //   });
  // }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.companyId = params['company_id'] || '';
    //   console.log(this.companyId);
    // });
      this.service.divjuneReport(this.companyId).subscribe((res) => {
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
