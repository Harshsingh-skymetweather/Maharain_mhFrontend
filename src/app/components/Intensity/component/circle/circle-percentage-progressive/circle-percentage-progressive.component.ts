import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';

@Component({
  selector: 'app-circle-percentage-progressive',
  templateUrl: './circle-percentage-progressive.component.html',
  styleUrls: ['./circle-percentage-progressive.component.scss']
})
export class CirclePercentageProgressiveComponent implements OnInit {

  isOpen = false;
  districts: any;
  circlepercentage:any[]= [];
  selectedDivision: string = '';
  selectedState:any = '';
  selectedMonth:any = '';
  divisions:any;
  selectedDistrict:any;
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

  constructor(private service:CommonService,
    private intensity:IntensityService,
    private Printpdf:PrintPDFService
  ) { }

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
    console.log(this.selDivisionCode,"this.selDivisionCode");
    const selectedDivision = this.divisions.find((div: { division_code: any; }) => div.division_code === divisionCode);
      console.log(this.divisions,'division');
      if (selectedDivision) {
        this.selectedDivisionName = selectedDivision.division_name;

      }
    });

  }

    getDistrict(title: any) {
     this.service.getDistrict(title).subscribe((res) => {
        this.districts = res;
        console.log(this.districts)
      });
    }

    circlePercentageIntensity(){
        this.resetArrays();
        let totalCount=0;
        this.selDivFlag = true;
        this.selectDivisionName = this.selectedDivisionName;
      this.intensity.getCirclePercentageProgressiveIntensity(this.selDivisionCode,this.selectedMonth).subscribe((res: any[]) => {
        this.circlePercentageIntensityData = res;
        this.circlePercentageIntensityData.forEach((el:any) => {
          this.circlepercentage.push(el)
         })
        this.transformDataDiv = false;
        this.circlePercentageIntensityDiv = true;
        console.log(this.transformDataDiv,"this.transformDataDiv");
        console.log(this.circlePercentageIntensityDiv,"this.circlePercentageIntensityDiv");

        for (const district of this.circlepercentage) {
          if (district.tehsils) {
            console.log(district,'district')
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
          this.intensity.getCirclePercentageProgressiveIntensity(this.selDivisionCode,this.selectedMonth).subscribe((res) => {
            this.dataArray= res;
            console.log(this.circlePercentageIntensityDiv,"this.circlePercentageIntensityDiv");
            console.log(this.transformDataDiv,"this.transformDataDiv");

            this.dataArray.forEach((el:any) => {
              this.defaultCirclePercentage.push(el)
             })
            console.log( this.defaultCirclePercentage,"this.defaultCirclePercentage");
            for (const district of this.defaultCirclePercentage) {
              if (district.tehsils) {
                let districtData: any = {
                  districtName: district.district_name,
                  districtIntensity: district.intensity,
                  pageBreak: false,
                  tehsils: []
                };
               // this.processDistrict(district.tehsils, districtData);
               // this.defaultCirclePercentage.push(districtData);
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
                        //console.log(this.circleData,"this.circleData");

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
                      //console.log(districtData.pageBreak,"districtData.pageBreak");
                      //console.log(tehsilData.pageBreak,"tehsilData.pageBreak");


                      //console.log(totalCount,"totalCount");
                      districtData.tehsils.push(tehsilData);
                    console.log(tehsilData,"tehsilData");
                    }


                  }
                  this.organisedData.push(districtData);
                console.log(this.organisedData,"districtData");
                }

              }
              this.circlePercentageIntensityDiv = false;
              this.transformDataDiv = true;
          });
         // this.organisedData = [];

          }

        resetPageBreakCounter() {
          this.pageBreakCounter = 0;
        }

        resetArrays() {
            this.circlePercentageIntensityData = [];
            this.circlepercentage = [];
            this.defaultCirclePercentage = [];
            this.organisedData = [];
           console.log(this.defaultCirclePercentage,"in resetArrays");

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

        downloadPdf() {
          this.Printpdf.GenerateCirclePercentagePDF(this.organisedData);
        }
}
