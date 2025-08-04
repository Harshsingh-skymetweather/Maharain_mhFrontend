import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-tehsil-pastyear-heavyrain',
  templateUrl: './tehsil-pastyear-heavyrain.component.html',
  styleUrls: ['./tehsil-pastyear-heavyrain.component.scss']
})
export class TehsilPastyearHeavyrainComponent implements OnInit {


  selectedDivision:any='';
  selectedYear: any = '';
  selectedMonth: any ='';
  today:Date=new Date();
  inputData:any= [];
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


  selectedDistrict: string = '';
  transformedData: any = [];
  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }
  groupedData:any;
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

  onSubmit() {
    if(this.selectedYear)
    {
       this.service.Tehsilheavyrainfall(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res) => {
        this.report=res;
        console.log(this.report, 'reportdata');
      });
    }
  }

  downloadPdf() {
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadheavyrain();
  }

}
