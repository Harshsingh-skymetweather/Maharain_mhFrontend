import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-tehsil-count-season',
  templateUrl: './tehsil-count-season.component.html',
  styleUrls: ['./tehsil-count-season.component.scss']
})
export class TehsilCountSeasonComponent implements OnInit {

  currentDate:any=new Date();
  selectedMonth:any=''
  report:any;
  availableMonths: number[] = [];

  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
  }

  ngOnInit() {
    this.onSubmit();
  }

  getMonthName(month: number): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sept", "Oct", "Nov", "Dec"];
    return monthNames[month - 1];
  }

  onSubmit() {
    this.service.gettehsilcountseason(this.selectedMonth).subscribe((res) => {
        this.report = this.transformDataForTable(res);
        console.log(this.report);
        this.availableMonths = this.calculateAvailableMonths();
    });
}

transformDataForTable(res: any[]): any[] {
    const transformedData = [];
    const divisionMap: { [key: string]: { division: string; districts: any[] } } = {};
    res.forEach(item => {
        const divisionKey = `${item.Divisionname}`;
        const districtKey = `${item.Districtname}`;
        const month = item.month;

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
                overall: {
                    'below25': 0,
                    '25-50': 0,
                    '50-75': 0,
                    '75-100': 0,
                    '100above': 0
                }
            };
            divisionMap[divisionKey].districts.push(district);
        }

        if (!district.months[month]) {
            district.months[month] = {
                'below25': 0,
                '25-50': 0,
                '50-75': 0,
                '75-100': 0,
                '100above': 0
            };
        }


        const intensityGroup = item.intensity_Group.replace(' ', '').toLowerCase();
        district.months[month][intensityGroup] += isNaN(item.Count) ? 0 : item.Count;
        district.overall[intensityGroup] += isNaN(item.Count) ? 0 : item.Count;
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

calculateColumnSum(districts: any[], month: number, column: string): number {
    return districts.reduce((sum, district) => sum + (district.months[month] ? district.months[month][column] : 0), 0);
}

calculateMonthlyOverallSum(month: number, intensityGroup: string): number {
    let sum = 0;
    this.report.forEach((divisionData: any) => {
        divisionData.districts.forEach((district: any) => {
            sum += district.months[month] ? district.months[month][intensityGroup] : 0;
        });
    });
    return sum;
}

calculateOverallSum(intensityGroup: string): number {
    let sum = 0;
    this.report.forEach((divisionData: any) => {
        divisionData.districts.forEach((district: any) => {
            sum += district.overall[intensityGroup];
        });
    });
    return sum;
}


calculateAvailableMonths(): number[] {
const months = new Set<number>();
  this.report.forEach((divisionData: any) => {
   divisionData.districts.forEach((district: any) => {
    Object.keys(district.months).forEach(month => months.add(Number(month)));
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



