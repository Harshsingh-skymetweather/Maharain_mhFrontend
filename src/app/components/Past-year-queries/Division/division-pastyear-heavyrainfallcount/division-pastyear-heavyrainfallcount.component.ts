import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-division-pastyear-heavyrainfallcount',
  templateUrl: './division-pastyear-heavyrainfallcount.component.html',
  styleUrls: ['./division-pastyear-heavyrainfallcount.component.scss']
})
export class DivisionPastyearHeavyrainfallcountComponent implements OnInit {

  selectedYear: any = '';
  districts: any;
  today: Date = new Date();
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
      this.service.Divisionheavyrainfallcount(this.selectedYear).subscribe((res) => {
        this.inputData = res;
        console.log( this.inputData,'hwffhdg')
      });
    }

    getHeavyRainDays(division: any, month: number) {
      const data = division.DateData.find((item: any) => item.month === month);
      console.log(data,'jjsh')
      return data ? data.heavyraindays : 0;
    }


    getTotalHeavyRainDays(division: any) {
      return division.DateData.reduce((total: number, data: any) => total + data.heavyraindays, 0);
    }

    downloadPdf() {
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadheavyrain();
    }

}


