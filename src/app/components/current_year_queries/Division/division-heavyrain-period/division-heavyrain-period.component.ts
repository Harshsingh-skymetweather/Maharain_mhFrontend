import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-division-heavyrain-period',
  templateUrl: './division-heavyrain-period.component.html',
  styleUrls: ['./division-heavyrain-period.component.scss']
})
export class DivisionHeavyrainPeriodComponent implements OnInit {

  selectedYear: any = '';
  fromDate:any='';
  toDate:any='';

  today: Date = new Date();
  report: any[] = [];
  todayDate: string='';
  companyId: string = '';
  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }
  submitted: boolean = false;
  ngOnInit(): void {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }
  onSubmit() {
    if(this.fromDate!='' && this.toDate!='')
    {
      this.service.getdivisionheavyrainforperiod(this.fromDate,this.toDate).subscribe((res) => {
        this.report=res;
        if(this.report.length==0)
        {
          this.submitted=true;
        }

      });
    }
    else{
      alert('please select fromdate and todate');
    }

  }


  downloadPdf() {
    this.printpdf.divisionheavyrainPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadheavyrain();
  }

}
