import { Component, OnInit } from '@angular/core';
import { IntensityService } from 'src/app/service/intensity.service';

@Component({
  selector: 'app-dist-percentage-selected-month',
  templateUrl: './dist-percentage-selected-month.component.html',
  styleUrls: ['./dist-percentage-selected-month.component.scss']
})
export class DistPercentageSelectedMonthComponent implements OnInit {

  today:Date=new Date();
  circleIntensityCount: any;
  intensityData: any = [];

  selectedMonth:any='';

  //monthsdata
  currentYear = new Date().getFullYear();
  selectedMonthmonthes: any;
  arraymonth: any = [];
  currentMonthIndex: any;

  constructor(private IntensityService: IntensityService) {}

  ngOnInit(): void {

    this.currentMonthIndex = new Date().getMonth();
    var monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < monthes.length; i++) {
      if (i === (this.currentMonthIndex) + 1) { break; }
      this.selectedMonthmonthes = {
        name: monthes[i],
        value: i + 1
      }
      this.arraymonth.push(this.selectedMonthmonthes)
    }

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

onSubmit() {
  if(this.selectedMonth!='')
    {
      console.log(this.selectedMonth);
      this.IntensityService.getIntensityPercentData(this.selectedMonth).subscribe((res: any) => {
        this.intensityData = res;
        console.log(this.intensityData,"this.intensityData");
    })
  }
  else{
  alert('please select month')
  }

}

getMaxRows(): number[] {
  const maxRows = Math.max(...this.intensityData.map((division: any) => division.districts.length)) + 1;
  return Array(maxRows).fill(0).map((_, i) => i);
}


}
