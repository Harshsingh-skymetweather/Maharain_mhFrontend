import { Component,Input,OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() monthChecked = false
  selectedMonth:any='';
  result:any;
  groupedData: any = {};
  currentDate:any=new Date();

  selectedMonthmonthes: any;
  arraymonth: any = [];
  currentMonthIndex: any;

  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
 }
ngOnInit() {
 this.getmonthslist();
 this.onSubmit();
}

 getmonthslist()
 {
  this.currentMonthIndex = new Date().getMonth();
  var monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
   'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < monthes.length; i++) {
    if (i === (this.currentMonthIndex) + 1) { break; }
    this.selectedMonthmonthes = {
      name: monthes[i],
      value: i + 1
    }
    this.arraymonth.push(this.selectedMonthmonthes)
   }
 }

 onSubmit() {
    this.service.districtcount(this.selectedMonth).subscribe((res) => {
      this.result = res;

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
    return ['below 25', '25-50', '50-75', '75-100', '100 above'];
  }

  getTotalCount(items: any[]): number {
    return items.reduce((total, item) => total + parseInt(item.count), 0);
  }

  getTotalTehsilsCount(): number {
    return this.getOrderedIntensityGroups().reduce((total, intensity) =>
      total + this.getTotalCount(this.groupedData[intensity]), 0);
  }

  downloadPdf() {
    this.pdfservice.downloadIntensityPdf();
  }

  downloadExcel(): void {
    this.getexcel.downloadExcelIntensity();
   }



}
