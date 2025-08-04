import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circle-count-season',
  templateUrl: './circle-count-season.component.html',
  styleUrls: ['./circle-count-season.component.scss']
})
export class CircleCountSeasonComponent implements OnInit {

  currentDate: any = new Date();
  selectedMonth: any = '';
  report: any;
  availableMonths: number[] = [];

  constructor(private service: IntensityService,
              private pdfservice: PrintPDFService,
              private getexcel: GenerateexcelService) {
  }

  ngOnInit() {
    this.onSubmit();
  }

  getMonthName(month: number): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return monthNames[month - 1];
  }

  onSubmit() {
    this.service.Circlecountseason(this.selectedMonth).subscribe((res) => {
      this.report = this.transformDataForTable(res);
      console.log(this.report, 'report');
      this.availableMonths = this.calculateAvailableMonths();
    });
  }

  transformDataForTable(res: any[]): any[] {
    const transformedData = [];
    const divisionMap: { [key: string]: { division: string; districts: any[] } } = {};

    res.forEach(item => {
      if (!item.Divisionname || !item.Districtname) {
        console.error("Invalid data entry found:", item);
        return;
      }

      const divisionKey = `${item.Divisionname}`;
      const districtKey = `${item.Districtname}`;
      const monthKey = `month_${item.month}`;

      if (!divisionMap[divisionKey]) {
        divisionMap[divisionKey] = {
          division: item.Divisionname,
          districts: []
        };
      }

      let district = divisionMap[divisionKey].districts.find(d => d.district === districtKey);
      if (!district) {
        district = {
          district: districtKey,
          months: {},
          overallSum: {
            'below25': 0,
            '25-50': 0,
            '50-75': 0,
            '75-100': 0,
            '100above': 0
          }
        };
        divisionMap[divisionKey].districts.push(district);
      }

      if (!district.months[monthKey]) {
        district.months[monthKey] = {
          'below25': 0,
          '25-50': 0,
          '50-75': 0,
          '75-100': 0,
          '100above': 0
        };
      }

      const intensityGroup = item.intensity_Group.replace(' ', '').toLowerCase();
      const count = isNaN(item.Count) ? 0 : item.Count;
      district.months[monthKey][intensityGroup] += count;
      district.overallSum[intensityGroup] += count;
    });

    for (const divisionKey in divisionMap) {
      if (Object.prototype.hasOwnProperty.call(divisionMap, divisionKey)) {
        const division = divisionMap[divisionKey];
        transformedData.push({
          division: division.division,
          districts: division.districts
        });
      }
    }

    return transformedData;
  }

  calculateColumnSum(districts: any[], column: string, month: string): number {
    return districts.reduce((sum, district) => sum + (district.months[month][column] || 0), 0);
  }

  calculateOverallSum(intensityGroup: string, month: string): number {
    let sum = 0;
    this.report.forEach((divisionData: any) => {
      divisionData.districts.forEach((district: any) => {
        sum += (district.months[month][intensityGroup] || 0);
      });
    });
    return sum;
  }


  calculateOverallSumAllMonths(intensityGroup: string): number {
    let sum = 0;
    this.report.forEach((divisionData: any) => {
      divisionData.districts.forEach((district: any) => {
        sum += (district.overallSum[intensityGroup] || 0);
      });
    });
    return sum;
  }

  calculateDivisionOverallSum(districts: any[], intensityGroup: string): number {
    return districts.reduce((sum, district) => sum + (district.overallSum[intensityGroup] || 0), 0);
  }


  calculateAvailableMonths(): number[] {
    const months = new Set<number>();
    this.report.forEach((divisionData: any) => {
      divisionData.districts.forEach((district: any) => {
        Object.keys(district.months).forEach(month => {
          months.add(Number(month.split('_')[1]));
        });
      });
    });
    return Array.from(months).sort((a, b) => a - b);
  }

  downloadPdf() {
    this.pdfservice.downloadIntensityPdf();
  }

  downloadExcel(): void {
    this.getexcel.downloadExcelIntensity();
  }

}
