import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-tehsil-count-selected-month',
  templateUrl: './tehsil-count-selected-month.component.html',
  styleUrls: ['./tehsil-count-selected-month.component.scss']
})
export class TehsilCountSelectedMonthComponent implements OnInit {

  currentDate:any=new Date();
  selectedMonth:any='';
  selectedyear:any='';
  report:any;
  selectedMonthmonthes: any;
  arraymonth: any = [];
  currentMonthIndex: any;


  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
 }

  ngOnInit() {
 this.Onmonthselected();
  }

  Onmonthselected() {
    this.currentMonthIndex = new Date().getMonth();
    const months = [
      { name: 'January', abbr: 'Jan', value: '01' },
      { name: 'February', abbr: 'Feb', value: '02' },
      { name: 'March', abbr: 'Mar', value: '03' },
      { name: 'April', abbr: 'Apr', value: '04' },
      { name: 'May', abbr: 'May', value: '05' },
      { name: 'June', abbr: 'Jun', value: '06' },
      { name: 'July', abbr: 'Jul', value: '07' },
      { name: 'August', abbr: 'Aug', value: '08' },
      { name: 'September', abbr: 'Sep', value: '09' },
      { name: 'October', abbr: 'Oct', value: '10' },
      { name: 'November', abbr: 'Nov', value: '11' },
      { name: 'December', abbr: 'Dec', value: '12' }
    ];

    // Only push months up to the current month
    for (let i = 0; i <= this.currentMonthIndex; i++) {
      this.arraymonth.push(months[i]);
    }
  }

  getFormattedMonth(): string {
    if (!this.selectedMonth) {
      return '';
    }
    const month = this.arraymonth.find((m: { name: string; value: string }) => m.value === this.selectedMonth);
    return month ? month.name : '';
  }

  onSubmit(){
    if (this.selectedMonth != '') {
    this.service.gettehsilListandcount(this.selectedyear,this.selectedMonth).subscribe((res) => {
      console.log(this.selectedMonth,'selectedmonth');
      this.report = this.transformDataForTable(res);
    });
  }
  else{
    alert('please select an month')
  }
  }

  transformDataForTable(res: any[]): any[] {
    const transformedData = [];
    const divisionMap: { [key: string]: { division: string; districts: any[] } } = {};
    res.forEach(item => {
      const divisionKey = `${item.division_name}`;
      const districtKey = `${item.district_name}`;

      if (!divisionMap[divisionKey]) {
        divisionMap[divisionKey] = {
          division: item.division_name,
          districts: []
        };
      }
      let district = divisionMap[divisionKey].districts.find(d => d.district === districtKey);
      if (!district) {
        district = {
           district: districtKey,
          'below25': 0,
          '25-50': 0,
          '50-75': 0,
          '75-100': 0,
          '100above': 0
        };
        divisionMap[divisionKey].districts.push(district);
      }

      const intensityGroup = item.intensity_Group.replace(' ', '').toLowerCase();
      district[intensityGroup] += isNaN(item.Count) ? 0 : item.Count;
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


  calculateColumnSum(districts: any[], column: string): number {
    return districts.reduce((sum, district) => sum + district[column], 0);
  }


  calculateTotalForDivision(districts: any[]): number {
    let total = 0;
    districts.forEach(district => {
      total += district['below25'] + district['25-50'] + district['50-75'] + district['75-100'] + district['100above'];
    });
    return total;
  }

  calculateOverallSum(intensityGroup: string): number {
    let sum = 0;
    this.report.forEach((divisionData: any) => {
      divisionData.districts.forEach((district:any) => {
        sum += district[intensityGroup] || 0;
      });
    });
    return sum;
  }

  calculateOverallTotal(): number {
    let total = 0;
    this.report.forEach((divisionData:any) => {
      divisionData.districts.forEach((district:any) => {
        total += (district['below25'] || 0) + (district['25-50'] || 0) + (district['50-75'] || 0) + (district['75-100'] || 0) + (district['100above'] || 0);
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


