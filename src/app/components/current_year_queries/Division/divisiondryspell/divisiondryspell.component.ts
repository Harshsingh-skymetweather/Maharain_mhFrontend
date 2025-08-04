import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divisiondryspell',
  templateUrl: './divisiondryspell.component.html',
  styleUrls: ['./divisiondryspell.component.scss']
})
export class DivisiondryspellComponent implements OnInit {

  selectedYear: any = '';
  statereport: any[] =[];
  report: any[] = [];
  submitted:boolean=false;
  today:any=new Date();
  currentmonth:any=new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();
  companyId: string = '';

  fromDate:any='';
  toDate:any='';
  maxToDate:string;


  divisions:any;
  districts:any;
  statereports:any=[];

  selectedDivision: any = '';
  selectedState:any = '';
  selectedDistrict:any ='';

  fromDuration: string = '';
  toDuration: string = '';


  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) {
    this.maxToDate = this.getTodayDate();
  }
  ngOnInit(): void {
    this.getdivisiondryspell();
    this.getdivision();
  }

  getdivision() {
    this.service.getcompanydivisions().subscribe((res) => {
     this.divisions = res;
     console.log( this.divisions,'dvjjhdhjk')
      });
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

  onSubmit()
  {
    this.service.DivisiondurationDryspell(this.currentYear,this.selectedDivision,this.fromDate,this.toDate,this.fromDuration,this.toDuration).subscribe((res) => {
    this.report = res;
    if(this.report.length==0)
    {
      this.submitted=true;
    }
    console.log(this.report, 'reportdata');
  });

  }
 getdivisiondryspell()
  {
    this.service.DivisiondurationDryspell(this.currentYear,this.selectedDivision,this.fromDate,this.toDate,this.fromDuration,this.toDuration).subscribe((res) => {
      this.report = res;
      if(this.report.length==0)
      {
        this.submitted=true;
      }
      console.log(this.report, 'reportdata');
    });
  }

  downloadPdf() {
    this.printpdf.downloadcurrentyearPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadcurrentyearExcel();
  }


}
