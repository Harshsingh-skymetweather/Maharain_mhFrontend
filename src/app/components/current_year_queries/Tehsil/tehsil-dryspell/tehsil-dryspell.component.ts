import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentqueriesService } from 'src/app/service/currentqueries.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehsil-dryspell',
  templateUrl: './tehsil-dryspell.component.html',
  styleUrls: ['./tehsil-dryspell.component.scss']
})
export class TehsilDryspellComponent implements OnInit {

  divisions:any;
  districts:any;
  statereports:any=[];
  report: any[] = [];
  today:any=new Date();

  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';

  fromDate:any='';
  toDate:any='';
  maxToDate:string;

  fromDuration: string = '';
  toDuration: string = '';

  submitted:boolean=false;
  companyId: string = '';
  constructor(private service:CommonService,
    private currentqueries:CurrentqueriesService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {
  this.maxToDate = this.getTodayDate();

  }

  ngOnInit(): void {
    this.getdivision();
  }

  onFromDateChange() {
    this.maxToDate = this.fromDate;
  }

  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
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
        alert("please select state");
     }
     else
     {
      this.currentqueries.PTehsildryspell(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.fromDate,this.toDate,this.fromDuration,this.toDuration).subscribe((res) => {
      this.report = res;
      if(this.report.length==0)
        {
          this.submitted=true;
        }
    });
    }
    }

    downloadPdf() {
      console.log('pdf')
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadcurrentyearExcel();
    }


}
