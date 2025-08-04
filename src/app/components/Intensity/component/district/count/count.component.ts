import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
today: Date = new Date();
total:any;
count:any;
result: any[] = [];
groupedData: any[] = [];
selectedMonth:any='';
intensityGroupTotals: any = {};
constructor(private service:IntensityService
  , private pdfservice:PrintPDFService
  , private getexcel:GenerateexcelService) {
}

ngOnInit() {
this.getmodifiedresult();
}

getmodifiedresult(){
  this.service.districtcount(this.selectedMonth).subscribe((res:any)=>{
    this.result = res
    this.groupDataByDivision();
  })
}

groupDataByDivision() {
  this.groupedData = [];
  this.result.forEach(item => {
    let existingGroup = this.groupedData.find(group => group.division_name === item.division_name);
    if (existingGroup) {
      existingGroup.data.push(item);
    } else {
      this.groupedData.push({ division_name: item.division_name, data: [item] });
    }
  });
}

getCount(data: any[], intensityGroup: string): string {
  const foundItem = data.find((el: any) => el.intensity_Group === intensityGroup);
  return foundItem ? foundItem.count : '-';
}

getTotalCount(data: any[]): number {
  let totalCount = 0;
  data.forEach((el: any) => {
    totalCount += parseInt(el.count);
  });
  return totalCount;
}

calculateIntensityGroupTotals() {
  this.intensityGroupTotals = {
    'below 25': 0,
    '25-50': 0,
    '50-75': 0,
    '75-100': 0,
    '100 above': 0
  };

  this.result.forEach(item => {
    this.intensityGroupTotals[item.intensity_Group] += parseInt(item.count);
  });
}

getTotalIntensityGroupTotal(intensity: string): number {
  return this.result
    .filter(item => item.intensity_Group === intensity)
    .reduce((total, item) => total + parseInt(item.count), 0);
}

getTotalIntensityGroupTotalALL(): number {
  return this.result.reduce((total, item) => total + parseInt(item.count), 0);
}


downloadPdf() {
  this.pdfservice.downloadIntensityPdf();
}

downloadExcel(): void {
  this.getexcel.downloadExcelIntensity();
 }


}
