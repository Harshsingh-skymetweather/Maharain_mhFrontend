import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';

@Component({
  selector: 'app-percentage-month',
  templateUrl: './percentage-month.component.html',
  styleUrls: ['./percentage-month.component.scss']
})
export class PercentageMonthComponent implements OnInit {

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  isOpen = false;
  districts: any;
  circlepercentage:any[]= [];
  selectedDivision: string = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any;
  selectedMonth:any='';
  dataArray:any[] = [];
  months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
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

  constructor(private service:CommonService
    ,private intesityservice:IntensityService
    ,private printf:PrintPDFService
  )
  { }

  ngOnInit(): void {

    this.getdivision();
    this.transformData();
    this.resetPageBreakCounter();
    this.currentDate = new Date();
  }

  getdivision(divisionCode?: any) {
  this.div = this.service.getDivisions().subscribe((res) => {
    this.divisions = res;
    this.selDivisionCode = divisionCode || '';
    this.selDivisionName = this.divisions;


    const selectedDivision = this.divisions.find((div: { division_code: any; }) => div.division_code === divisionCode);
      if (selectedDivision) {
        this.selectedDivisionName = selectedDivision.division_name;
      }
    });

  }

    getDistrict(title: any) {
     this.service.getDistrict(title).subscribe((res) => {
        this.districts = res;
      });
    }

    circlePercentageIntensity(){
        this.resetArrays();
        let totalCount=0;
        this.selDivFlag = true;
        this.selectDivisionName = this.selectedDivisionName;

        this.intesityservice.getCirclePercentageIntensity(this.selDivisionCode,this.selectedMonth).subscribe((res: any[]) => {
            this.circlePercentageIntensityData = res;
            console.log(this.circlePercentageIntensityData,'intensity data');
            this.circlePercentageIntensityData.forEach((el:any) => {
              this.circlepercentage.push(el)
             })
            this.transformDataDiv = false;
            this.circlePercentageIntensityDiv = true;


            for (const district of this.circlepercentage) {
              if (district.tehsils) {

                let districtData: any = {
                  districtName: district.district_name,
                  districtIntensity: district.intensity,
                  pageBreak: false,
                  tehsils: []
                };

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
              this.transformDataDiv = false;
              this.circlePercentageIntensityDiv = true;
          });
    }

      transformData() {
        this.resetArrays();
          let totalCount = 0;
          this.intesityservice.getCirclePercentageIntensity(this.selDivisionCode,this.selectedMonth).subscribe((res) => {
            this.dataArray= res;
            this.dataArray.forEach((el:any) => {
              this.defaultCirclePercentage.push(el)
             })
            for (const district of this.defaultCirclePercentage) {
              if (district.tehsils) {
                let districtData: any = {
                  districtName: district.district_name,
                  districtIntensity: district.intensity,
                  pageBreak: false,
                  tehsils: []
                };

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
              this.circlePercentageIntensityDiv = false;
              this.transformDataDiv = true;
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
            return '#776EFE';
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

downloadPdf() {
  this.printf.GenerateCirclePercentagePDF(this.organisedData);
}

}
