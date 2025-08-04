import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehsil-heavyrain-count',
  templateUrl: './tehsil-heavyrain-count.component.html',
  styleUrls: ['./tehsil-heavyrain-count.component.scss']
})
export class TehsilHeavyrainCountComponent implements OnInit {

  divisions:any;
  districts:any;
  statereports:any=[];
  today:any=new Date();
  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';
  report: any[] = [];
  monthsname: any = [];
  submitted:boolean=false;
  companyId: string = '';
  constructor(private service:CommonService,
    private currentreport: CurrentreportService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {

    this.monthsname  = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
      ];
  }

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
    if(this.selectedState == ''){
      alert("please select state ")
     }
     else
     {
      this.currentreport.TehsilheavyrainfallCount('2024',this.selectedDivision,this.selectedDistrict).subscribe((res) => {
        this.report=res;
        if(this.report.length==0)
        {
          this.submitted=true;
        }
      });
    }
    }

    getHeavyRainDays(tehsil: any, month: number) {
      const data = tehsil.DateData.find((item: any) => item.month === month);
      return data ? data.heavyraindays : 0;
    }


    getTotalHeavyRainDays(tehsil: any) {
      return tehsil.DateData.reduce((total: number, data: any) => total + data.heavyraindays, 0);
    }

    downloadPdf() {
      console.log('pdf')
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadcurrentyearExcel();
    }

}
