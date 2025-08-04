import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';
import { PrintPDFService } from 'src/app/service/print-pdf.service';

@Component({
  selector: 'app-dist-percentage-progressive',
  templateUrl: './dist-percentage-progressive.component.html',
  styleUrls: ['./dist-percentage-progressive.component.scss']
})
export class DistPercentageProgressiveComponent implements OnInit {
  today:Date=new Date();
  circleIntensityCount: any;
  intensityData: any = [];
  constructor(private IntensityService: IntensityService,
          private printf:PrintPDFService
  ) {}
 selectedmonth:any='';
  ngOnInit(): void {
  this.getIntensityPercentDistrictData();
}

getIntensityColor(intensity: number): string {
  if (intensity < 25) {
    return '#FF0000';
  } else if (intensity >= 25 && intensity < 50) {
    return '#EDFF00';
  } else if (intensity >= 50 && intensity < 75) {
    return '#776EFE';
  } else if (intensity >= 75 && intensity < 100) {
    return '#00DC67';
  } else {
    return '#006400';
  }

}

getIntensityPercentDistrictData() {
  this.IntensityService.getIntensityPercentProgressiveData(this.selectedmonth).subscribe((res: any) => {
      this.intensityData = res;
      console.log(this.intensityData,"this.intensityData");
  })
}

getMaxRows(): number[] {
  const maxRows = Math.max(...this.intensityData.map((division: any) => division.districts.length)) + 1;
  return Array(maxRows).fill(0).map((_, i) => i);
}


downloadPdf() {
  this.printf.generateDistrictPDF(this.intensityData);
}

}
