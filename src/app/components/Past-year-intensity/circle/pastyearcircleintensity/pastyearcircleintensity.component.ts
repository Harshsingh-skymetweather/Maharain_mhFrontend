import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';



@Component({
  selector: 'app-pastyearcircleintensity',
  templateUrl: './pastyearcircleintensity.component.html',
  styleUrls: ['./pastyearcircleintensity.component.scss']
})
export class PastyearcircleintensityComponent implements OnInit {

  selectedYear:any = '';
  selectedMonth:any = '';
  dates: (number|null)[] = [];

  isOpen = false;
  districts: any;
  circlepercentage:any[]= [];
  selectedDivision: string = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any;
  dataArray:any[] = [];
  //months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  organisedData: any[] = [];
  circleData:any;
  pageBreakCounter: number = 0;
  circle:boolean = true;
  totalCount:number = 0;
  currentDate: any;
  circlePercentageIntensityData: any[] = [];
  defaultCirclePercentage: any[]=[];
  selectedDivisionCode: any = '';
  selectedDivisionName: any;
  selDivisionCode: any = '';
  transformDataDiv: boolean = true;
  circlePercentageIntensityDiv: boolean = false;
  selDivFlag:boolean = false;
  selDivisionName: any;
  currentDivisionName: any;
  selectDivisionName: any;
  div: any;

  years: number[] = this.generateYears(2015, new Date().getFullYear() -1);
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  constructor(private service:CommonService
    ,private intesityservice:IntensityService
    ,private printf:PrintPDFService
  ) { }

  ngOnInit(): void {
  this.getdivision();
  this.resetPageBreakCounter();

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

  getdivision(divisionCode?: any) {
    this.service.getDivisions().subscribe((res) => {
      this.divisions = res;
      this.selDivisionCode = divisionCode || '';
      this.selDivisionName = this.divisions;
      console.log(this.selDivisionCode, "this.selDivisionCode");
      const selectedDivision = this.divisions.find((div: { division_code: any; }) => div.division_code === divisionCode);
      console.log(this.divisions, 'division');
      if (selectedDivision) {
        this.selectedDivisionName = selectedDivision.division_name;
        console.log(this.selectedDivisionCode, "this.selectedDivisionCode");
        console.log(this.selectedDivisionName, "this.selectedDivisionName");
      }

    });

  }

  getMonth(selectMonth: any) {
    this.months.forEach(element => {
      element = this.selectedMonth;
      console.log(this.selectedMonth, "this.selectedMonth");
    });
  }



  getCirclePercentageIntensityMonthData() {
    if (this.selectedMonth == '' || this.selectedMonth == '-- For Month --') {
      alert("Please Select Month")
    }
    else
    this.circlePercentageIntensity();
  }
  circlePercentageIntensity() {
    if(this.selectedDivisionName) {
      this.selDivFlag;
    }
    this.resetArrays();
    let totalCount = 0;
    this.selDivFlag = false;
    this.selectDivisionName = this.selectedDivisionName;

    this.intesityservice.getCirclePercentageIntensity(this.selDivisionCode,this.selectedMonth).subscribe((res) => {
      this.circlePercentageIntensityData = res;
      this.circlePercentageIntensityData.forEach((el: any) => {
        this.circlepercentage.push(el)
      })

      this.circlePercentageIntensityDiv = true;

      for (const district of this.circlepercentage) {
        if (district.tehsils) {
          console.log(district, 'district')
          let districtData: any = {
            districtName: district.district_name,
            districtIntensity: district.intensity,
            pageBreak: false,
            tehsils: []
          };

          // this.processDistrict(district.tehsils, districtData);
          //this.organisedData.push(districtData);

          for (const tehsil of district.tehsils) {
            if (tehsil.circles) {
              let tehsilData: any = {
                tehsilName: tehsil.tehsil_name,
                tehsilIntensity: tehsil.intensity,
                pageBreak: false,
                circles: []
              };

              for (const circle of tehsil.circles) {
                this.circleData = {
                  circleName: circle.circle_name,
                  circleIntensity: circle.intensity,
                  pageBreak: false
                };

                if (totalCount < 61) {
                  tehsilData.circles.push(this.circleData);
                  totalCount++;
                }

                if (totalCount === 60) {
                  districtData.tehsils.push(tehsilData);
                  this.organisedData.push(districtData);

                  totalCount = 0;
                  this.circleData.pageBreak = true;
                  districtData.pageBreak = true;


                  totalCount = 0;
                  tehsilData = {
                    tehsilName: tehsil.tehsil_name,
                    tehsilIntensity: tehsil.intensity,
                    pageBreak: false,
                    circles: []
                  };
                  districtData = {
                    districtName: district.district_name,
                    districtIntensity: district.intensity,
                    pageBreak: false,
                    tehsils: []
                  };
                }
              }
              districtData.tehsils.push(tehsilData);
            }
          }
          this.organisedData.push(districtData);
        }
      }
      this.circlePercentageIntensityDiv = true;
    });

  }

  resetPageBreakCounter() {
    this.pageBreakCounter = 0;
  }

  resetArrays() {
    this.circlePercentageIntensityData = [];
    this.circlepercentage = [];
    this.defaultCirclePercentage = [];
    this.organisedData = [];
  }

  getIntensityColor(intensity: number): string {
    if (intensity < 25) {
      return '#FF0000';
    } else if (intensity >= 25 && intensity < 50) {
      return '#FFFF00';
    } else if (intensity >= 50 && intensity < 75) {
      return '#EE82EE';
    } else if (intensity >= 75 && intensity < 100) {
      return '#90EE90';
    } else {
      return '#006400';
    }
  }

  getColumns(circles: any[]): any[][] {
    const itemsPerRow = 6;
    const result: any[][] = [];
    for (let i = 0; i < circles.length; i += itemsPerRow) {
      result.push(circles.slice(i, i + itemsPerRow));
    }
    return result;
  }


  formatDate(formattedDate: any): string {
    alert()
    const currentDate = new Date();
    formattedDate = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    console.log(formattedDate);
    return formattedDate;
  }


downloadPdf() {
  this.printf.GenerateCirclePercentagePDF(this.organisedData);
}


}
