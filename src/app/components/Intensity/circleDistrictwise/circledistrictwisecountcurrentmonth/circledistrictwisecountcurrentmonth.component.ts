import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circledistrictwisecountcurrentmonth',
  templateUrl: './circledistrictwisecountcurrentmonth.component.html',
  styleUrls: ['./circledistrictwisecountcurrentmonth.component.scss']
})
export class CircledistrictwisecountcurrentmonthComponent implements OnInit {

  currentDate: any = new Date();
  selectedMonth: any = '';
  report: any;

  constructor(private Intensityservice: IntensityService,
    private pdfservice:PrintPDFService,
    private getexcel:GenerateexcelService
  ) {
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.Intensityservice.circledistwisecount().subscribe((res) => {
      this.report = this.transformDataForTable(res);
    });
  }

  transformDataForTable(res: any[]): any[] {
    const transformedData = [];
    const districtMap: { [key: string]: { district: string; tehsils: any[] } } = {};
    res.forEach(item => {
      const districtKey = `${item.district_name}`;
      const tehsilKey = `${item.Tehsil_name}`;

      if (!districtMap[districtKey]) {
        districtMap[districtKey] = {
          district: item.district_name,
          tehsils: []
        };
      }

      let tehsil = districtMap[districtKey].tehsils.find(t => t.tehsil === tehsilKey);
      if (!tehsil) {
        tehsil = {
          tehsil: tehsilKey,
          'below25': 0,
          '25-50': 0,
          '50-75': 0,
          '75-100': 0,
          '100above': 0
        };
        districtMap[districtKey].tehsils.push(tehsil);
      }
      // Increment count based on intensity group directly using Count parameter
      const intensityGroup = item.intensity_Group.replace(' ', '').toLowerCase();
      tehsil[intensityGroup] += isNaN(item.Count) ? 0 : item.Count; // Ensure item.Count is a number
    });

    // Convert districtMap to the desired format
    for (const districtKey in districtMap) {
      if (Object.prototype.hasOwnProperty.call(districtMap, districtKey)) {
        const district = districtMap[districtKey];
        transformedData.push({
          district: district.district,
          tehsils: district.tehsils
        });
      }
    }

    return transformedData;
  }

  calculateColumnSum(tehsils: any[], column: string): number {
    return tehsils.reduce((sum, tehsil) => sum + tehsil[column], 0);
  }

  calculateTotalForDistrict(tehsils: any[]): number {
    let total = 0;
    tehsils.forEach(tehsil => {
      total += tehsil['below25'] + tehsil['25-50'] + tehsil['50-75'] + tehsil['75-100'] + tehsil['100above'];
    });
    return total;
  }

  calculateOverallSum(intensityGroup: string): number {
    let sum = 0;
    this.report.forEach((districtData: any) => {
      districtData.tehsils.forEach((tehsil: any) => {
        sum += tehsil[intensityGroup] || 0;
      });
    });
    return sum;
  }

  calculateOverallTotal(): number {
    let total = 0;
    this.report.forEach((districtData: any) => {
      districtData.tehsils.forEach((tehsil: any) => {
        total += (tehsil['below25'] || 0) + (tehsil['25-50'] || 0) + (tehsil['50-75'] || 0) + (tehsil['75-100'] || 0) + (tehsil['100above'] || 0);
      });
    });
    return total;
  }


  downloadPdf() {
    this.pdfservice.downloadIntensityPdf();
  }

  downloadExcel(): void {
    this.getexcel.downloadExcelIntensity();
   }


}
