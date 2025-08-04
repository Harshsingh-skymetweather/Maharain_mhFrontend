import { Component, Input, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';

@Component({
  selector: 'app-circle-count-selected-month',
  templateUrl: './circle-count-selected-month.component.html',
  styleUrls: ['./circle-count-selected-month.component.scss']
})
export class CircleCountSelectedMonthComponent implements OnInit {

  selectedMonth:any='';
  currentDate:any=new Date();
  report:any;

  //monthsdata

  currentYear = new Date().getFullYear();
  arraymonth: any = [];
  currentMonthIndex: any;

  constructor(private service:IntensityService
    , private pdfservice:PrintPDFService
    , private getexcel:GenerateexcelService) {
  }

  ngOnInit() {
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
    if(this.selectedMonth!='')
    {
      this.service.CircleIntensitylistandCount(this.selectedMonth).subscribe((res) => {
        console.log(this.selectedMonth,'selectedmonth');
        this.report = this.transformDataForTable(res);
        console.log(this.report,'report');
      }
      );
  }
  else{
     alert('Please select the month')
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

      // Increment count based on intensity group directly using Count parameter
      const intensityGroup = item.intensity_Group.replace(' ', '').toLowerCase();
      district[intensityGroup] += isNaN(item.Count) ? 0 : item.Count; // Ensure item.Count is a number
    });

    // Convert divisionMap to the desired format
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






