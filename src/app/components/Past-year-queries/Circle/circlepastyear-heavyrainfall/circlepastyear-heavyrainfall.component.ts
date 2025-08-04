import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circlepastyear-heavyrainfall',
  templateUrl: './circlepastyear-heavyrainfall.component.html',
  styleUrls: ['./circlepastyear-heavyrainfall.component.scss']
})
export class CirclepastyearHeavyrainfallComponent implements OnInit {

  selectedDivision:any='';
  selectedYear: any = '';
  today : Date=new Date();
  selectedMonth: any ='';
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
  groupedData:any;
  constructor(private service:CommonService,
    private currentqueries:CurrentqueriesService,
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
    this.currentqueries.circleRainfallHeavy(this.selectedYear, this.selectedDivision, this.selectedDistrict).subscribe((res) => {
        console.log(res,'result')
        this.inputData = res;
        console.log( this.inputData,'data')
        this.groupedData = Object.values(this.convertData());

      });

}

convertData(){
  this.inputData.forEach((item:any) => {
    const existingObject = this.transformedData.find(
      (obj:any) =>
      obj.district_name === item.District_name &&
      obj.tehsil === item.Tehsil &&
      obj.circle === item.Circle
      );

    if (existingObject) {
      existingObject.data.push({ date: item.date_Month, rain: item.rain });
    } else {
      this.transformedData.push({
        district_name: item.District_name,
        tehsil: item.Tehsil,
        circle: item.Circle,
        data: [{ date: item.date_Month, rain: item.rain }],
      });
    }
  });
  console.log(this.transformedData,'trnsformed');
  return this.transformedData
}


downloadPdf() {
  this.printpdf.heavyrainPdf();
}

downloadExcel(): void {
 this.Gexcel.downloadcurrentyearExcel();
}

}
