import { Component,Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-div-dailyrain-selected-month',
  templateUrl: './div-dailyrain-selected-month.component.html',
  styleUrls: ['./div-dailyrain-selected-month.component.scss']
})
export class DivDailyrainSelectedMonthComponent implements OnInit {

  selectedYear:any='';
  selectedMonth:any='';
  statereport: any[] =[];
  dates: (number|null)[] = [];
  //datesData: string[] = [];

  report: any[] = [];
  today: Date = new Date();
  //object:any ={}
  currentYear = new Date().getFullYear();

  selectedMonthmonthes: any;
  arraymonth: any = [];
  currentMonthIndex: any;
  companyId: string = '';
  constructor(private service:CommonService,
      private printf:PrintPDFService,
      private gexcel:GenerateexcelService){
  }

   ngOnInit() {
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

  generateDates(selectedMonth: any){
    const daysInMonth = new Date(this.currentYear, selectedMonth, 0).getDate();
    this.dates = Array.from({ length: daysInMonth }, (_, index) => {
      const date = index + 1;
      const currentDate = new Date(this.currentYear, selectedMonth - 1, date);
      if (currentDate <= this.today) {
        return date;
      } else {
        return null;
      }
    }).filter(date => date !== null);
  }

  onSubmit()
  {
    if(this.selectedMonth!='')
    {
      this.generateDates(this.selectedMonth);
      this.service.DivisiondailyRainReport(this.selectedYear,this.selectedMonth).subscribe((res) => {
        this.report = res.divdata;
        this.statereport=res.statedata;
      });
    }
  else
  {
    alert('please select month');
  }

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
    this.printf.GeneratedivisionPdF();
  }

  downloadExcel(): void {
    this.gexcel.downloadDivisionDailyRain();
   }


}
