import { Component, OnInit } from '@angular/core';
import { PacketcountService } from 'src/app/service/misc/packetcount.service';
@Component({
  selector: 'app-current-data',
  templateUrl: './current-data.component.html',
  styleUrls: ['./current-data.component.scss']
})
export class CurrentDataComponent implements OnInit {

  selectedDistrict:any ='';
  selectedTehsil:any ='';
  selectedCircle:any ='';
  selectedstation:any='';
  districts: any;
  tehsils:any;
  circles:any;
  stations:any;
  fromDate:any;
  toDate:any;
  result:any='';

  constructor(private service:PacketcountService) { }

  ngOnInit(): void {
    this.getDistrict();
  }

  onChangeDistrict(ev: any) {
    this.selectedDistrict = ev.target.value;
    this.getTehsils();
  }

  getDistrict() {
    this.service.getcurrentdistrict().subscribe((res) => {
       this.districts = res;
     });
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
    if(this.selectedstation!=''  && this.fromDate!=''&& this.toDate!='')
      {
        console.log(this.selectedstation,'ghagjsj');
        console.log(this.fromDate,'svhagj');
        console.log(this.toDate,'hsagjh');
        this.service.getdata(this.selectedstation,this.fromDate,this.toDate).subscribe((res) => {
          this.result = res;
          console.log(this.result,'result')
        });
     }
    else{
      alert('please select parameters');
    }
  }

}
