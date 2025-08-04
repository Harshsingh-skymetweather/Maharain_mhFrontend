import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circle-pastyear-dryspell',
  templateUrl: './circle-pastyear-dryspell.component.html',
  styleUrls: ['./circle-pastyear-dryspell.component.scss']
})
export class CirclePastyearDryspellComponent implements OnInit {
  selectedYear: any = '';
  selectedMonth: any ='';
  selectedDivision: string = '';

  selectedDistrict: string = '';
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

  }

  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let i = end; i >= start; i--) {
      years.push(i);
    }
    return years;
  }
  onYearChange(event: Event) {
    const selectedYear = (event.target as HTMLSelectElement).value;
    this.selectedYear = selectedYear;
  }

  onSubmit()
  {
    console.log(this.selectedYear,'selectedyear',this.selectedDivision,'selectedmonth',this.selectedDistrict)
    this.service.CircleDryspell(this.selectedYear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
      this.report = res;
      console.log(this.report, 'reportdata');
    });
  }


  downloadPdf() {
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadheavyrain();
  }



}
