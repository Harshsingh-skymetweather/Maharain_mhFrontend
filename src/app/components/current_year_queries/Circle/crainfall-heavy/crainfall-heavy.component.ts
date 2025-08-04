import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crainfall-heavy',
  templateUrl: './crainfall-heavy.component.html',
  styleUrls: ['./crainfall-heavy.component.scss']
})
export class CRainfallHeavyComponent implements OnInit {

  divisions:any;
  districts:any;
  inputData:any= [];
  statereports:any=[];
  today:any=new Date();
  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';
  selectedMonth:any='';
  report: any[] = [];
  companyId: string = '';
  submitted:boolean=false;
  transformedData: any = [];
  groupedData:any;
  constructor(private service:CommonService,
    private currentqueries:CurrentqueriesService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.getdivision();
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


onSubmit() {
    this.currentqueries.circleRainfallHeavy('2024', this.selectedDivision, this.selectedDistrict)
      .subscribe((res) => {
        this.inputData = res;
        this.groupedData = Object.values(this.convertData());
      });

}

convertData(){
  this.inputData.forEach((item:any) => {
    const existingObject = this.transformedData.find(
      (obj:any) =>
      obj.district_name === item.District_name &&
      obj.tehsil === item.Tehsil &&
      obj.circle === item.Circle
      );

    if (existingObject) {
      existingObject.data.push({ date: item.date_Month, rain: item.rain });
    } else {
      this.transformedData.push({
        district_name: item.District_name,
        tehsil: item.Tehsil,
        circle: item.Circle,
        data: [{ date: item.date_Month, rain: item.rain }],
      });
    }
  });
  return this.transformedData
}



downloadPdf() {
  this.printpdf.heavyrainPdf();
}

downloadExcel(): void {
 this.Gexcel.downloadcurrentyearExcel();
}

}
