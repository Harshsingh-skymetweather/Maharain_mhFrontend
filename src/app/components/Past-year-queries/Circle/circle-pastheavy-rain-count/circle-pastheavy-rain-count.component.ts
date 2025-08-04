import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circle-pastheavy-rain-count',
  templateUrl: './circle-pastheavy-rain-count.component.html',
  styleUrls: ['./circle-pastheavy-rain-count.component.scss']
})
export class CirclePastheavyRainCountComponent implements OnInit {

  today:Date=new Date();
  districts: any;
  inputData:any= [];
  selectedYear:string='';
  selectedDivision: string = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict: string = '';
  transformedData: any = [];
  monthsname: any = [];

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
    private currentqueries:CurrentqueriesService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {

    this.monthsname  = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];

   }
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
    console.log(this.selectedYear);
    this.currentqueries.CircleRainfallHeavyCount(this.selectedYear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
      this.inputData = res;
      console.log(this.inputData,'shfas')
      this.convertData();

    });
  }

  convertData(){
    this.inputData.forEach((item: any) => {
      const existingObject = this.transformedData.find(
        (obj: any) =>
          obj.district_name === item.District_name &&
          obj.tehsil === item.Tehsil &&
          obj.circle === item.Circle
      );

      if (existingObject) {

        const monthIndex = item.date_Month - 1; // Adjusting for 0-based index
        existingObject.data[monthIndex] = item.heavy_rain_days;
      }
      else {
        const newData = Array(12).fill(0); // Assuming there are 12 months in a year
        const monthIndex = item.date_Month - 1; // Adjusting for 0-based index
        newData[monthIndex] = item.heavy_rain_days;
        console.log(this.transformedData,'sdvjah')
        this.transformedData.push({
          district_name: item.District_name,
          tehsil: item.Tehsil,
          circle: item.Circle,
          data: newData,
        });

      }
    });
  }

  calculateTotalForDistrict(data: number[]): number {
    return data.reduce((total, value) => total + value, 0);
  }

  downloadPdf() {
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadheavyrain();
  }


 }

