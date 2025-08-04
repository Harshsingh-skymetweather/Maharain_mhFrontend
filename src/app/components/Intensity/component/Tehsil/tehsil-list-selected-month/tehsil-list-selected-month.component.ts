import { Component, OnInit } from '@angular/core';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { IntensityService } from 'src/app/service/intensity.service';

@Component({
  selector: 'app-tehsil-list-selected-month',
  templateUrl: './tehsil-list-selected-month.component.html',
  styleUrls: ['./tehsil-list-selected-month.component.scss']
})
export class TehsilListSelectedMonthComponent implements OnInit {

  selectedMonth:any='';
  result:any;
  groupedData: any = {};
  currentDate:any=new Date();
  selectedyear:any='';
    //monthsdata

    currentYear = new Date().getFullYear();
    selectedMonthmonthes: any;
    arraymonth: any = [];

    currentMonthIndex: any;
  constructor(private service:IntensityService
    ,private printf:PrintPDFService
    ,private gexcel:GenerateexcelService) {
}

ngOnInit() {
this.getmonthslist();
}

getmonthslist()
{
  this.currentMonthIndex = new Date().getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i <= this.currentMonthIndex; i++) {
    const selectedMonthObj = {
      name: months[i],
      value: i + 1
    };

    this.arraymonth.push(selectedMonthObj);
    console.log(this.arraymonth);
  }
}
onSubmit(){
  this.service.gettehsilListandcount(this.selectedyear,this.selectedMonth).subscribe((res) => {
    this.result = res
    console.log(this.selectedMonth,'month');
    console.log(res,'this.result');
      this.groupDataByIntensity();

  });
}

groupDataByIntensity() {
  const intensityGroups = ['below 25', '25-50', '50-75', '75-100', '100 above'];
  intensityGroups.forEach(group => this.groupedData[group] = []);
  this.result.forEach((item: any) => {
    const intensity = item.intensity_Group;
    this.groupedData[intensity]?.push(item);
  });
}

getOrderedIntensityGroups(): string[] {
  return ['below 25', '25-50', '50-75', '75-100', '100 above'].filter(group => this.groupedData[group]?.length);
}

getTotalCount(items: any[]): number {
  return items.reduce((total, item) => total + item.Count, 0);
}

getTotalTehsilsCount(): number {
  return this.getOrderedIntensityGroups().reduce((total, intensity) =>
    total + this.getTotalCount(this.groupedData[intensity]), 0);
}

hasData(): boolean {
  return this.groupedData && Object.keys(this.groupedData).length > 0;
}


downloadPdf() {
  this.printf.downloadIntensityPdf();
}

downloadExcel(): void {
 this.gexcel.downloadExcelIntensity();
}


}

