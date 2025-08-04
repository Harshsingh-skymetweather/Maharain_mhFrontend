import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-pastyeartehsilcount',
  templateUrl: './pastyeartehsilcount.component.html',
  styleUrls: ['./pastyeartehsilcount.component.scss']
})
export class PastyeartehsilcountComponent implements OnInit {

  currentDate:any=new Date();
  report:any;
  arraymonth: any = [];
   //selectedMonthmonthes: any;
  //currentMonthIndex: any;


  selectedMonth: any ='';
  selectedYear: any = '';
  years: number[] = this.generateYears(2015, new Date().getFullYear() -1);
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


  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
 }

  ngOnInit() {
  }

  onMonthChange(): void {

  }

  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let i = end; i >= start; i--) {
      years.push(i);
    }
    return years;
  }
  onYearChange() {
    this.selectedMonth = '';
  }

  onSubmit(){
    if (this.selectedMonth != '') {
      console.log(this.selectedYear,'selectedYear');
    this.service.gettehsilListandcount(this.selectedYear,this.selectedMonth).subscribe((res) => {
      console.log(this.selectedMonth,'selectedmonth');
      this.report = this.transformDataForTable(res);
      console.log(this.report);
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


