import { HttpClient,HttpHeaders,HttpBackend , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IntensityService {

   baseURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
   testURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
   // testURL = 'https://192.168.105.5:7240/api/'
    Token:any;
    comId:any;

  constructor(private http:HttpClient,
    private httpBackend: HttpBackend,private router:Router){
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          const queryParams = new URLSearchParams(this.router.url.split('?')[1]);
          this.comId = queryParams.get('company_id');
        }
        console.log(this.comId,'company_id')
      })
  }

  //circlePercetageAPI
  getCirclePercentageIntensity(DivisionCode:any,month:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageIntensity&division='+DivisionCode+'&month='+month+ '&company_id='+this.comId);
  }

  getCirclePercentageProgressiveIntensity(DivisionCode:any,month:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageProgressive&division='+DivisionCode+'&month='+month+'&company_id='+this.comId);
  }

  //circleintensity
 CircleIntensitylistandCount(month:any): Observable<any> {
  return this.http.get( this.baseURL + 'Maharain?type=CircleIntensityCountandList&month='+month+ '&company_id='+this.comId);
}

  //circlePercetageAPI
  getCirclePastPercentageIntensity(DivisionCode:any,month:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageIntensity&division='+DivisionCode+'&month='+month);
  }


//intensitycount
 districtcount(month:any):Observable<any> {
  return this.http.get(this.testURL + 'Maharain?list=1&type=getListandcountDistrict&Count=1&month='+month +'&company_id='+this.comId);
}

districtcountlistProgreesive(month:any):Observable<any> {
  return this.http.get(this.testURL + 'Maharain?list=1&type=getListandcountProgressiveDistrict&Count=1&month='+month +'&company_id='+this.comId);
}


CircleIntensityProgressivecountlist(month:any): Observable<any> {

  return this.http.get( this.baseURL + 'Maharain?type=CircleProgressiveIntensityCountandList&month='+month+ '&company_id='+this.comId);
}


// CircleIntensityProgressiveCount(month:any): Observable<any> {
//   this.Token = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('Maharain-Token')}`,
//   });
//   return this.http.get( this.baseURL + 'Maharain?type=CircleIntensityProgessiveCount&month='+month, {headers:this.Token});
// }



Circlecountseason(month:any): Observable<any> {
  this.Token = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('Maharain-Token')}`,
  });
  return this.http.get( this.baseURL + 'Maharain?type=getcirclecountseason&month='+month, {headers:this.Token});
}

CirclePastIntensitylistandCount(year:any,month:any): Observable<any> {
  this.Token = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('Maharain-Token')}`,
  });
  return this.http.get( this.baseURL + 'Maharain?year='+year+'&type=CirclePreviousIntensityCountandList&'+month, {headers:this.Token});
}

//districtwisecircle
circledistwisecount():Observable<any>{
  return this.http.get(this.testURL +'Maharain?type=CircleIntensityDistrictwise&company_id='+this.comId);
}

districtwisecirclecountProgressive():Observable<any>{
  return this.http.get(this.testURL +'Maharain?type=CircleDistrictwisecountProgressive&company_id='+this.comId);
}

gettehsilListandcount(year:any,month:any): Observable<any> {
  return this.http.get(this.testURL +'Maharain?type=gettehsillistandcount&month='+month+'&year='+year+ '&company_id='+this.comId);
}


gettehsilProgressivecountlist(month:any): Observable<any> {

  return this.http.get(this.testURL +'Maharain?type=gettehsillistcountProgressive&month='+month+ '&company_id='+this.comId);
}

gettehsilcountseason(month:any): Observable<any> {

  return this.http.get(this.baseURL +'Maharain?type=gettehsilcountseason'+ '&company_id='+this.comId);
}

getPreviousCirclePercentageIntensity(DivisionCode:any,year:any,month:any): Observable<any> {
  this.Token = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('Maharain-Token')}`,
  });
    return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageIntensity&division='+DivisionCode+'&month='+month+'&year='+year, {headers:this.Token});
}

//tehsilPercentage
getTehsilPercentageintensityData(DivisionCode:any,month:any): Observable<any> {
  return this.http.get(this.baseURL +'Maharain?type=GetTehsilPercentage&division='+DivisionCode+'&month='+month+ '&company_id='+this.comId);
}


getTehsilPercentageProgressive(DivisionCode:any,month:any): Observable<any> {
  return this.http.get(this.testURL +'Maharain?type=GetTehsilPercentageProgressive&division='+DivisionCode+'&month='+month+ '&company_id='+this.comId);
}


//tehsilpast
getTehsilPastPercentageintensityData(year:any,DivisionCode:any,month:any): Observable<any> {
  return this.http.get(this.baseURL +'Maharain?type=GetTehsilPercentage&division='+DivisionCode+'&month='+month+'&year='+year+ '&company_id='+this.comId);
}


//districtPercetageAPI
getIntensityPercentData(month:any): Observable<any> {
  return this.http.get(this.baseURL + 'Maharain?Division=&type=getDistrictPercentagedata&month='+month + '&company_id='+this.comId);
}

//districtPercetageAPI
getIntensityPercentProgressiveData(month:any): Observable<any> {
  return this.http.get(this.baseURL + 'Maharain?Division=&type=getDistrictPercentageprogressive&month='+month+ '&company_id='+this.comId);
}



}
