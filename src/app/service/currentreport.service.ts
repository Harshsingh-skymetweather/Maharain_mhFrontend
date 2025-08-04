import { HttpClient,HttpHeaders,HttpBackend , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentreportService {

 baseURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
 TestURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
 TestURL1 = 'https://192.168.105.5:7240/api/'

  Token:any;
  comId:any;
  constructor(private http:HttpClient, private httpBackend: HttpBackend,private router:Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const queryParams = new URLSearchParams(this.router.url.split('?')[1]);
        this.comId = queryParams.get('company_id');
      }
    })
  }
//division
divRangeReport(company_id:any): Observable<any> {
  return this.http.get(this.baseURL + 'Maharain?type=get_monthwise_division_data&Company_id='+this.comId);
}

divjuneReport(company_id:any): Observable<any> {
  return this.http.get(this.baseURL + 'Maharain?type=junemonth_division_data&Company_id='+this.comId);
}

//district
distRangeReport(div:any,company_id:any): Observable<any> {
  return this.http.get(this.TestURL1 + 'Maharain?type=get_monthwise_district_data&division='+div+'&Company_id='+this.comId);
}

distjuneReport(div:any,company_id:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=junemonth_district_data&division='+div +'&Company_id='+company_id);
}

tehsilJunReport(div:any,dist:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=get_junetehsil_data&division='+div+'&district='+dist + '&Company_id='+this.comId);
}

//currentyear cirlce
circleJunReport(div:any,dist:any): Observable<any> {

  return this.http.get(this.TestURL + 'Maharain?type=get_Circle_junemonth&division='+div+'&district='+dist+ '&Company_id='+this.comId);
}

circletest(div:any,dist:any): Observable<any>
{
  return this.http.get(this.TestURL +'Maharain?type=get_Circle_junemonth&division='+div+'&district='+dist+ '&Company_id='+this.comId);
}

//currentyear cirlce
circlereortcomare(div:any,dist:any,month:any): Observable<any> {

  return this.http.get(this.baseURL + 'Maharain?type=get_Circle_Raincomare&division='+div+'&district='+dist+'&month='+month+ '&Company_id='+this.comId);
}

circleJunseptReport(div:any,dist:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=get_monthwiseJunsept_circle_data&division='+div+'&district='+dist+ '&Company_id='+this.comId);
}

  //circleapi
 circleRangeReport(div:any,dist:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=get_monthwise_circle_data&division='+div+'&district='+dist+ '&Company_id='+this.comId);
  }

 //tehsilapi
 tehsilRangeReport(div:any,dist:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=get_monthwise_tehsil_data&division='+div+'&district='+dist+ '&Company_id='+this.comId);
}


//circlequeries
circleDailyRaineriod(year:any,div:any,dist:any,fromdate:any,todate:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=Getcircledailyrainforperiod&division='+div+'&district='+dist+'&fromdate='+fromdate+'&year='+year+'&todate='+todate+ '&Company_id='+this.comId);
}

//tehsilheavyrainfall
Tehsilheavyrainfall(year:any,div:any,dist:any,month:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=gettehsilheavyrain&division='+div+'&district='+dist+'&month='+month+'&year='+year+ '&Company_id='+this.comId);
}


TehsilheavyrainfallCount(year:any,div:any,dist:any): Observable<any> {
  return this.http.get(this.TestURL + 'Maharain?type=gettehsilheavyrainCount&division='+div+'&district='+dist+'&year='+year+ '&Company_id='+this.comId);
}

}
