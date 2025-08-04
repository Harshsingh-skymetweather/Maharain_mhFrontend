import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { CurrentreportService } from 'src/app/service/currentreport.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tehsil-heavyrain-forperiod',
  templateUrl: './tehsil-heavyrain-forperiod.component.html',
  styleUrls: ['./tehsil-heavyrain-forperiod.component.scss']
})
export class TehsilHeavyrainForperiodComponent implements OnInit {
  divisions:any;
  districts:any;
  statereports:any=[];
  today:any=new Date();
  selectedYear:any='';
  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';
  selectedMonth:any='';
  report: any[] = [];
  submitted:boolean=false;

  fromDate:any='';
  toDate:any='';

  todayDate: string='';
  companyId: string = '';

  constructor(private service:CommonService,
    private currentreort: CurrentreportService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.getdivision();
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  getdivision() {
    this.service.getcompanydivisions().subscribe((res) => {
     this.divisions = res;
            console.log(this.divisions,'division');
      });
    }
    onChangedivision(ev: any) {
     this.getDistrict(ev.target.value);
        this.selectedDivision = ev.target.value;
        console.log(this.selectedDivision,'selecteddivsion');
     }

  getDistrict(title: any) {
      this.service.getDistrict(title).subscribe((res) => {
         this.districts = res;
         console.log(this.districts)
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
      this.currentreort.Tehsilheavyrainfall(this.selectedYear,this.selectedDivision,this.selectedDistrict,this.selectedMonth).subscribe((res) => {
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
