import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distheavyrain',
  templateUrl: './distheavyrain.component.html',
  styleUrls: ['./distheavyrain.component.scss']
})
export class DistheavyrainComponent implements OnInit {
  divisions:any;
  districts:any;
  statereports:any=[];
  today:any=new Date();
  currentyear=this.today.getFullYear();
  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';
  report: any[] = [];
  submitted:boolean=false;
  companyId: string = '';
  constructor(private service:CommonService,
    private currentserviec:CurrentqueriesService,
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
    if(this.selectedState == ''){
      alert("please select state ")
     }
     else
     {
      this.currentserviec.Districtheavyrainfall(this.currentyear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
        this.statereports = res.statedata;
        this.report=res;
        if(this.report.length==0)
        {
          this.submitted=true;
        }
        console.log(this.report, 'reportdata');
      });
    }
    }

    downloadPdf() {
      console.log('pdf')
      this.printpdf.heavyrainPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadheavyrain();
    }

}
