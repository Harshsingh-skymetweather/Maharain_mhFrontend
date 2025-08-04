import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divheavyrain',
  templateUrl: './divheavyrain.component.html',
  styleUrls: ['./divheavyrain.component.scss']
})
export class DivheavyrainComponent implements OnInit {

  selectedYear: any = '';
  today: Date = new Date();
  submitted:boolean=false;
  report: any[] = [];
  companyId: string = '';

  constructor(private service:CommonService,
    private printpdf:PrintPDFService,
    private Gexcel:GenerateexcelService
  ) { }

  ngOnInit(): void {
    this.getDivisionReport();
  }

  getDivisionReport() {
    this.service.Divisionheavyrainfall('2024').subscribe((res) => {
      this.report=res;
      if(this.report.length==0)
      {
        this.submitted=true;
      }

    });
  }



  downloadPdf() {
    this.printpdf.divisionheavyrainPdf();
  }

  downloadExcel(): void {
   this.Gexcel.downloadheavyrain();
  }

}
