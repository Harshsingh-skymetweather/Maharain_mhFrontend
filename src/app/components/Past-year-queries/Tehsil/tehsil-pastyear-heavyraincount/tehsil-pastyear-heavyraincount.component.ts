import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-tehsil-pastyear-heavyraincount',
  templateUrl: './tehsil-pastyear-heavyraincount.component.html',
  styleUrls: ['./tehsil-pastyear-heavyraincount.component.scss']
})
export class TehsilPastyearHeavyraincountComponent implements OnInit {


  today:Date=new Date();
  selectedYear: any = '';
  districts: any;
  inputData:any= [];
  selectedDivision: string = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict: string = '';
  transformedData: any = [];
  monthsname: any = [];

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
      private printpdf:PrintPDFService,
      private Gexcel:GenerateexcelService
    ) {

      this.monthsname  = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];

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

  groupedData:any;

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.selectedYear,'year')
      this.service.TehsilheavyrainfallCount(this.selectedYear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
        this.inputData = res;
        console.log( this.inputData,'rain data')
      });
    }

    getHeavyRainDays(tehsil: any, month: number) {
      const data = tehsil.DateData.find((item: any) => item.month === month);
      return data ? data.heavyraindays : 0;
    }


    getTotalHeavyRainDays(tehsil: any) {
      return tehsil.DateData.reduce((total: number, data: any) => total + data.heavyraindays, 0);
    }


    downloadPdf() {
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadcurrentyearExcel();
    }

}


