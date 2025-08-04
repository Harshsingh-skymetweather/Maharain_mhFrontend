import { Component, OnInit } from '@angular/core';
import { PacketcountService } from 'src/app/service/misc/packetcount.service';

@Component({
  selector: 'app-weeklyreports',
  templateUrl: './weeklyreports.component.html',
  styleUrls: ['./weeklyreports.component.scss']
})
export class WeeklyreportsComponent implements OnInit {

 // weekNumbers = [49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26];
  weekNumbers = [8,7,6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15];

  weekStartDate: string = '';
  weekEndDate: string = '';

  selectedDivisionType:any ='';
  selectedDivision:any ='';
  selectedDistrict:any ='';
  selectedTehsil:any ='';
  selectedCircle:any ='';
  selectedstation:any='';
  divisions: any;
  districts: any;
  tehsils:any;
  circles:any;
  stations:any;
  fromDate:any;
  toDate:any;
  result:any='';

  constructor(private service:PacketcountService) { }
  ngOnInit(): void {
    this.getWeekDates(56);
  }


  onChangeDistrict(ev: any) {
    this.selectedDistrict = ev.target.value;
    this.getTehsils();
  }

  getDistrict() {
    if(this.selectedDivisionType!='' && this.selectedDivision!=null)
      {
        this.service.getdailydistrict(this.selectedDivisionType,this.selectedDivision).subscribe((res) => {
          this.districts = res;
        });
    }
  }



  getTehsils() {
    if(this.selectedDistrict!='' && this.selectedDistrict!=null)
    {
      this.service.gettehsils(this.selectedDistrict).subscribe((res) => {
        this.tehsils = res;
        console.log(this.tehsils,'tehsils')
      });
    }
    else{
      alert('please select district')
    }
  }

  getCircles() {
    if(this.selectedDistrict!=''  && this.selectedTehsil!='' )
      {
        this.service.getcircles(this.selectedDistrict,this.selectedTehsil).subscribe((res) => {
          this.circles = res;
          console.log(this.circles,'circles')
        });
     }
    else{
      alert('please select tehsil');
    }
  }

  onChangeDivtype(ev: any)
  {
     this.selectedDivisionType = ev.target.value;
      this.getdivision();
  }

  getdivision()
  {
    if(this.selectedDivisionType!='')
      {
        console.log(this.selectedDivisionType,'shjm')
        this.service.getDivision(this.selectedDivisionType).subscribe((res) => {
          this.divisions = res;
          console.log(this.divisions,'divisions')
        });
     }
    else{
      alert('please select Division Type');
    }
  }

  onChangeDivision(ev: any)
  {
     this.selectedDivision = ev.target.value;
     this.getDistrict();
  }

  onChangeTehsil(ev: any)
   {
      this.selectedTehsil = ev.target.value;
      this.getCircles();
   }

  getstation()
  {
    if(this.selectedDistrict!=''  && this.selectedTehsil!=''&& this.selectedCircle!='')
      {
        this.service.getstation(this.selectedDistrict,this.selectedTehsil,this.selectedCircle).subscribe((res) => {
          this.stations = res;
          console.log(this.stations,'circles')
        });
     }
    else{
      alert('please select tehsil');
    }
  }

  onChangeCircle(ev: any)
  {
     this.selectedCircle = ev.target.value;
     this.getstation();
  }

  onSubmit()
  {
    if(this.selectedDivision && this.selectedDistrict && this.weekStartDate && this.weekEndDate)
      {
        console.log(this.weekStartDate,'this.weekStartDate')
        console.log(this.weekEndDate,'this.weekEndDate')
        this.service.getweeklyReport(this.selectedDivision,this.selectedDistrict,this.selectedTehsil,this.selectedCircle,this.selectedstation,this.weekStartDate,this.weekEndDate).subscribe((res) => {
          this.result = res;
          console.log(this.result,'result')
        });
      }
      else{
          alert('please select district');
    }
  }


  onWeekChange(event: Event) {
    const selectedWeek = (event.target as HTMLSelectElement).value;
    this.getWeekDates(Number(selectedWeek));
  }

  getWeekDates(weekNumber: number) {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 6);
    const daysOffset = (weekNumber -2) * 7;

    const startOfWeek = new Date(startOfYear.setDate(startOfYear.getDate() + daysOffset));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    this.weekStartDate = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;
    this.weekEndDate = `${endOfWeek.getFullYear()}-${endOfWeek.getMonth() + 1}-${endOfWeek.getDate()}`;
  }

  onBtnExport() {
  if (this.result && Array.isArray(this.result)) {
    const csvData = this.convertToCSV(this.result);
    this.downloadCSV(csvData, 'weekly_report.csv');
  } else {
    alert('No data available for export!');
  }
}

convertToCSV(data: any[]): string {
  // Get the headers from the first item in the array
  const headers = Object.keys(data[0]);
  
  // Create the CSV content as a string
  const rows = data.map(item => {
    return headers.map(header => item[header]).join(',');
  });

  // Join the headers and rows into a single string
  return [headers.join(','), ...rows].join('\n');
}

downloadCSV(csvData: string, filename: string) {
  // Create a Blob from the CSV string
  const blob = new Blob([csvData], { type: 'text/csv' });
  
  // Create a download link and trigger it
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}



}
