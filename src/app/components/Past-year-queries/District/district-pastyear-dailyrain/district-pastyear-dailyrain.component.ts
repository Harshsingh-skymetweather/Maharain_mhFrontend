import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-district-pastyear-dailyrain',
  templateUrl: './district-pastyear-dailyrain.component.html',
  styleUrls: ['./district-pastyear-dailyrain.component.scss']
})
export class DistrictPastyearDailyrainComponent implements OnInit {

  selectedState:any='';
  selectedDivision:any='';
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

  divisions:any;
  reports:any= [];
  statereport: any[] =[];
  dates: (number|null)[] = [];
  datesData: string[] = [];
  report: any[] = [];

  today: Date = new Date();
  currentYear = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();

  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.generateDates();

    this.getdivision();
  }

  getdivision() {
    this.service.getDivisions().subscribe((res) => {
     this.divisions = res;
            console.log(this.divisions,'division');
      });
    }

    getDivisionName(divisionCode: string): string {
      const selectedDivisionData = this.divisions.find((division: any) => division.division_code === divisionCode);
      return selectedDivisionData ? selectedDivisionData.division_name : '';
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

  onSubmit() {
    console.log(this.selectedYear,'selectedyear',this.selectedMonth,'selectedmonth',this.selectedDivision,'division')
    this.service.PastDistrictdailyrainasday(this.selectedDivision, this.selectedYear,this.selectedMonth).subscribe((res) => {
      this.report = res;
      this.statereport=res.statedata;
      this.report = this.combineDivisionAndDistrictData(res.divdata, res.distdata);
      console.log(this.report, 'reportdata');
    });
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
            DateData: district.DateData,
            Normal:district.Normal
          };
        });

      const divisionData: any = {
        DivisionCode: division.DivisionCode,
        DivisionName: division.DivisionName,
        DateData: division.DateData,
        Normal:division.Normal,
        Districts: districtData,
      };
      combinedData.push(divisionData);
    }

    return combinedData;
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
