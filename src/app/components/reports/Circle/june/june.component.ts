import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-june',
  templateUrl: './june.component.html',
  styleUrls: ['./june.component.scss']
})
export class JuneComponent implements OnInit {
  isOpen = false;
  districts: any;
  apiData:any= [];
  reports:any= [];
  result:any= [];
  selectedDivision: any = '';
  selectedState:any = '';
  divisions:any;
  selectedDistrict:any ='';
  today: Date = new Date();
  companyId: string = '';
  constructor(private service:CommonService
    ,private currentreport:CurrentreportService
  ,private printf:PrintPDFService
  ,private gexcel:GenerateexcelService,
  private route: ActivatedRoute )
     { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['company_id'] || '';
      console.log(this.companyId);
    });
    this.getdivision();
  }

  getdivision() {
  console.log(this.companyId,'svxgaskjjx');
   this.service.getDivisionsC(this.companyId).subscribe((res) => {
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
      if(this.selectedState == ''){
       alert("please select state ")
      }
      else
      {
        this.currentreport.circletest(this.selectedDivision,this.selectedDistrict).subscribe((res: any[]) => {
        this.apiData = res;
        this.result = this.combineDivisionAndDistrictAndTehsilData(this.apiData);
      });
      }

}

combineDivisionAndDistrictAndTehsilData(apiData: {
      distdata: { DistrictCode: string; Districtname: string; monthlyData: any }[];
      tehsildata: { DistrictCode: string; Tehsilcode: string; Tehsilname: string; monthlyData: any }[];
      cirdata: { DistrictCode: string; Tehsilcode: string; Circlecode: string; circlename: string; monthlyData: any }[];
    }): any[] {
      const modifiedData: { districts: any[] } = {
        districts: [],
      };

      for (const district of apiData.distdata) {
        const districtObject: any = {
          DistrictCode: district.DistrictCode,
          Districtname: district.Districtname,
          tehsils: [],
        };
        for (const tehsil of apiData.tehsildata.filter((t) => t.DistrictCode === district.DistrictCode)) {
          const tehsilObject: any = {
            Tehsilcode: tehsil.Tehsilcode,
            Tehsilname: tehsil.Tehsilname,
            circles: [],
          };

          for (const circle of apiData.cirdata.filter(
            (c) => c.DistrictCode === district.DistrictCode && c.Tehsilcode === tehsil.Tehsilcode
          )) {
            const circleObject: any = {
              Circlecode: circle.Circlecode,
              circlename: circle.circlename,
              monthlyData: circle.monthlyData,
            };
            tehsilObject.circles.push(circleObject);
          }

          tehsilObject.monthlyData = tehsil.monthlyData;
          districtObject.tehsils.push(tehsilObject);
        }


        districtObject.monthlyData = district.monthlyData;
        modifiedData.districts.push(districtObject);
      }
      return modifiedData.districts;
}


downloadPdf() {
  this.printf.downloadcurrentyearPdf();
}

downloadExcel(): void {
 this.gexcel.downloadcurrentyearExcel();
}

}
