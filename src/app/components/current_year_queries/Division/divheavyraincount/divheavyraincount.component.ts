import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';
import { GenerateexcelService } from 'src/app/service/generateexcel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-divheavyraincount',
  templateUrl: './divheavyraincount.component.html',
  styleUrls: ['./divheavyraincount.component.scss']
})
export class DivheavyraincountComponent implements OnInit {

  today:any=new Date();
  selectedYear: any = '';
  currentyear=this.today.getFullYear();
  inputData:any= [];
  monthsname: any = [];
  submitted:boolean=false;
  companyId: string = '';
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

    this.getcircleHeavyrainfall();
  }
    getcircleHeavyrainfall() {
      console.log(this.currentyear,'xuysagjxh')
      this.service.Divisionheavyrainfallcount(this.currentyear).subscribe((res) => {
        this.inputData = res;
        if(this.inputData.length==0)
        {
          this.submitted=true;
        }
        console.log( this.inputData,'hwffhdg')
      });
    }

    getHeavyRainDays(division: any, month: number) {
      const data = division.DateData.find((item: any) => item.month === month);
      console.log(data,'jjsh')
      return data ? data.heavyraindays : 0;
    }

    getTotalHeavyRainDays(division: any) {
      return division.DateData.reduce((total: number, data: any) => total + data.heavyraindays, 0);
    }



    downloadPdf() {
      this.printpdf.downloadcurrentyearPdf();
    }

    downloadExcel(): void {
     this.Gexcel.downloadheavyrain();
    }


}

