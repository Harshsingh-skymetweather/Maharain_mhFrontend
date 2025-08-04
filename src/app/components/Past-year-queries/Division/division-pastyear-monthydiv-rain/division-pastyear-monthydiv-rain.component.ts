import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-division-pastyear-monthydiv-rain',
  templateUrl: './division-pastyear-monthydiv-rain.component.html',
  styleUrls: ['./division-pastyear-monthydiv-rain.component.scss']
})
export class DivisionPastyearMonthydivRainComponent implements OnInit {

  selectedYear: any = '';
  selectedMonth: any ='';
  years: number[] = this.generateYears(1998, new Date().getFullYear() -1);
  months: { value: string, name: string }[] = [
    {name:'Jan', value:'1'},
    {name:'Feb', value:'2'},
    {name:'Mar', value:'3'},
    {name:'Apr', value:'4'},
    {name:'May', value:'5'},
    {name:'Jun', value:'6'},
    {name:'Jul', value:'7'},
    {name:'Aug', value:'8'},
    {name:'Sept', value:'9'},
    {name:'Oct', value:'10'},
    {name:'Nov', value:'11'},
    {name:'Dec', value:'12'}
  ];

  statereport: any[] =[];
  dates: (number|null)[] = [];
  datesData: string[] = [];
  report: any[] = [];
  today: Date = new Date();
  //object:any ={}
  currentYear = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();

  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {

  }
  ngOnInit(): void {
     this.generateDates();
  }

  private generateDates(): void {
    if (this.selectedYear && this.selectedMonth) {
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.dates = Array.from({ length: daysInMonth }, (_, index) => {
        const date = index + 1;
        const currentDate = new Date(this.selectedYear, this.selectedMonth - 1, date);
        if (currentDate <= this.today) {
          return date;
        } else {
          return null;
        }
      }).filter(date => date !== null);

      console.log(this.dates, 'datearray');
    }
  }

  onMonthChange(): void {
    this.generateDates();
  }

  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let i = end; i >= start; i--) {
      years.push(i);
    }
    return years;
  }
  onYearChange() {
    this.selectedMonth = '';
  }

  onSubmit()
  {
    console.log(this.selectedYear,'selectedyear',this.selectedMonth,'selectedmonth')
    this.service.DivisiondailyRainReport(this.selectedYear,this.selectedMonth).subscribe((res) => {
      this.report = res.divdata;
      this.statereport=res.statedata;
      console.log(this.report, 'reportdata');
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
      return 0; // Avoid division by zero
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
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadcurrentyearExcel();
  }

}
