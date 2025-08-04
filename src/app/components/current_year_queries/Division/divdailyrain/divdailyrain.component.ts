import { Component,Input,OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divdailyrain',
  templateUrl: './divdailyrain.component.html',
  styleUrls: ['./divdailyrain.component.scss']
})
export class DivdailyrainComponent implements OnInit {

  selectedYear:any='';
  selectedMonth:any='';
  statereport: any[] =[];
  report: any[] = [];

  dates: (number|null)[] = [];
  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();
  companyId: string = '';
  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private gexcel:GenerateexcelService
  ) {
   }
  ngOnInit(): void {
    this.onSubmit();
    this.generateDates();
  }

  private generateDates(): void {
    const daysInMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();
    this.dates = Array.from({ length: daysInMonth }, (_, index) => {
      const date = index + 1;
      const currentDate = new Date(this.currentYear, this.currentMonthIndex, date);
      if (currentDate <= this.today) {
        return (date);
      } else {
        return null;
      }
    }).filter(date => date !== null);
  }


  onSubmit()
   {
    console.log(this.selectedMonth,'month')
    this.service.DivisiondailyRainReport(this.selectedYear,this.selectedMonth).subscribe((res) => {
      this.report = res.divdata;
      this.statereport=res.statedata;
    });
  }



  getRainValue(division: any, date: number | null): number {
    if (date === null) {
      return 0;
    }
    const dateData = division.DateData.find((dd:any) => dd.date === date);
    return dateData ? dateData.rain  : 0;
  }


  getDivisionTotalRain(division: any): number {
    if (!division.DateData || division.DateData.length === 0) {
      return 0;
    }

    return division.DateData.reduce((total:any, dd:any) => total + dd.rain, 0);
  }

  getPercentage(division: any): number {
    const totalRain = this.getDivisionTotalRain(division);
    const normalValue = division.Normal;

    if (normalValue === 0) {
      return 0;
    }

    return (totalRain / normalValue) * 100;
  }

  getRainyDays(division: any): number {
    if (!division.DateData || division.DateData.length === 0) {
      return 0;
    }
    return division.DateData.filter((dd: any) => dd.rain >= 2.5).length;

  }


  downloadPdf() {
    this.printpdf.GeneratedivisionPdF();
  }


  downloadExcel(): void {
    this.gexcel.downloadDivisionDailyRain();
   }



}
