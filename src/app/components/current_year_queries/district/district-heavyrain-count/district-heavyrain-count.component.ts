import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-district-heavyrain-count',
  templateUrl: './district-heavyrain-count.component.html',
  styleUrls: ['./district-heavyrain-count.component.scss']
})
export class DistrictHeavyrainCountComponent implements OnInit {

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
  currentyear=this.today.getFullYear();
  months: { value: string, name: string }[] = [
    {name:'Jan', value:'1'},
    {name:'Feb', value:'2'},
    {name:'Mar', value:'3'},
    {name:'Apr', value:'4'},
    {name:'May', value:'5'},
    {name:'Jun', value:'6'},
    {name:'Jul', value:'7'},
    {name:'Aug', value:'8'},
    {name:'Sept', value:'9'},
    {name:'Oct', value:'10'},
    {name:'Nov', value:'11'},
    {name:'Dec', value:'12'}
  ];
  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {

    this.monthsname  = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];
  }

  ngOnInit(): void {
    this.getdivision();
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
      this.service.Districtheavyrainfallcount(this.currentyear,this.selectedDivision,this.selectedDistrict).subscribe((res) => {
        this.report=res;
        console.log(this.report)
        if(this.report.length==0)
        {
          this.submitted=true;
        }
        console.log(this.report, 'reportdata');
      });
    }
    }

      getHeavyRainDays(division: any, month: number) {
        const data = division.MonthData.find((item: any) => item.month === month);
        console.log(data,'jjsh')
        return data ? data.heavyraindays : 0;
      }


      getTotalHeavyRainDays(division: any) {
        return division.MonthData.reduce((total: number, data: any) => total + data.heavyraindays, 0);
      }

      downloadPdf() {
        console.log('pdf')
        this.printpdf.downloadcurrentyearPdf();
      }

      downloadExcel(): void {
       this.Gexcel.downloadcurrentyearExcel();
      }

}
