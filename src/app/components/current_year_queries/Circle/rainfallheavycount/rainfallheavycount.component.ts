import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rainfallheavycount',
  templateUrl: './rainfallheavycount.component.html',
  styleUrls: ['./rainfallheavycount.component.scss']
})
export class RainfallheavycountComponent implements OnInit {

  districts: any;
  inputData:any= [];
  selectedYear:string='';
  selectedDivision: string = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict: string = '';
  transformedData: any = [];
  monthsname: any = [];
  today:any=new Date();
  companyId: string = '';
  constructor(private service:CommonService,
    private currentqueries:CurrentqueriesService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService

  ) {

    this.monthsname  = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];

   }

  groupedData:any;

  ngOnInit(): void {
    this.getdivision();
    this.convertData();
  }

  getdivision() {
   this.service.getcompanydivisions().subscribe((res) => {
    this.divisions = res;

     });
   }
   onChangedivision(ev: any) {
    this.getDistrict(ev.target.value);
       this.selectedDivision = ev.target.value;

    }



    getDistrict(title: any) {
     this.service.getDistrict(title).subscribe((res) => {
        this.districts = res;

      });
    }


 //getDistrictname
 getDistrictName(districtCode: string): string {
  const selectedDistrictData = this.districts.find((district: any) => district.district === districtCode);
  return selectedDistrictData ? selectedDistrictData.district_name : '';
}

//getDivisionname
getDivisionName(divisionCode: string): string {
  const selectedDivisionData = this.divisions.find((division: any) => division.division_code === divisionCode);
  return selectedDivisionData ? selectedDivisionData.division_name : '';
}

    getcircleHeavyrainfall() {

      this.currentqueries.CircleRainfallHeavyCount('2024',this.selectedDivision,this.selectedDistrict).subscribe((res) => {
        this.inputData = res;
        this.convertData();

      });
    }

    convertData(){
      this.inputData.forEach((item: any) => {
        const existingObject = this.transformedData.find(
          (obj: any) =>
            obj.district_name === item.District_name &&
            obj.tehsil === item.Tehsil &&
            obj.circle === item.Circle
        );

        if (existingObject) {

          const monthIndex = item.date_Month - 1; // Adjusting for 0-based index
          existingObject.data[monthIndex] = item.heavy_rain_days;
        }
        else {
          const newData = Array(12).fill(0); // Assuming there are 12 months in a year
          const monthIndex = item.date_Month - 1; // Adjusting for 0-based index
          newData[monthIndex] = item.heavy_rain_days;

          this.transformedData.push({
            district_name: item.District_name,
            tehsil: item.Tehsil,
            circle: item.Circle,
            data: newData,
          });

        }
      });
    }

    calculateTotalForDistrict(data: number[]): number {
      return data.reduce((total, value) => total + value, 0);
    }


    downloadPdf() {
      console.log('pdf')
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadcurrentyearExcel();
    }



}

