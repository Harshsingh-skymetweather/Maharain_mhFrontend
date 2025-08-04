import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circle-list-progressive',
  templateUrl: './circle-list-progressive.component.html',
  styleUrls: ['./circle-list-progressive.component.scss']
})
export class CircleListProgressiveComponent implements OnInit {

  selectedMonth:any='';
  result:any;
  groupedData: any = {};
  currentDate:any=new Date();
  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
  }
ngOnInit() {
this.onSubmit();
}
onSubmit(){
  this.service.CircleIntensityProgressivecountlist(this.selectedMonth).subscribe((res) => {
    this.result = res
    console.log(this.result,'sjhjmsh')
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
  return ['below 25', '25-50', '50-75', '75-100', '100 above']
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
  this.pdfservice.downloadIntensityPdf();
}

downloadExcel(): void {
  this.getexcel.downloadExcelIntensity();
 }


}
