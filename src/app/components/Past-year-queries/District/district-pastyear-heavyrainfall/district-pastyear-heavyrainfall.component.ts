import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-district-pastyear-heavyrainfall',
  templateUrl: './district-pastyear-heavyrainfall.component.html',
  styleUrls: ['./district-pastyear-heavyrainfall.component.scss']
})
export class DistrictPastyearHeavyrainfallComponent implements OnInit {

  selectedYear: any = '';
  selectedDivision:any= '';
  selectedDistrict:any= '';

  today:Date=new Date();

  statereports:any=[];
  report: any[] = [];
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
  constructor(private service:CommonService,
    private currentservice:CurrentqueriesService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

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
    console.log(this.selectedYear,'edjgjk')
      {
        this.currentservice.Districtheavyrainfall(this.selectedYear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
          this.statereports = res.statedata;
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
