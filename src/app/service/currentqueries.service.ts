import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpBackend , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentqueriesService {

    baseURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
   // testURL = 'https://192.168.105.5:7240/api/'
    testURL =  'https://projects.skymetweather.com/SWIMSServiceAPI/api/'

  Token:any;
  comId:any;
  constructor(private http:HttpClient, private httpBackend: HttpBackend,private router:Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const queryParams = new URLSearchParams(this.router.url.split('?')[1]);
        this.comId = queryParams.get('company_id');
      }
      console.log(this.comId,'hvhhj')
    })
   }

 //Tehsilqueries
 TehsilDailyrain(year:any,div:any,dist:any,month:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=Gettehsildataasday&division='+div+'&district='+dist+'&month='+month+'&year='+year+ '&company_id='+this.comId);
}

Tehsildryspell(year:any,div:any,dist:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=gettehsildryspell&division='+div+'&district='+dist+'&year='+year+ '&company_id='+this.comId);
}

PTehsildryspell(year:any,div:any,dist:any,fromDate:any,toDate:any,fromDuration:any,toDuration:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=gettehsildryspell&year='+year+'&division='+div+'&district='+dist +'&fromdate='+fromDate+'&todate='+toDate+'&fromduration='+fromDuration+'&toduration='+toDuration+'&company_id='+this.comId);
}

TehsilheadquarterDailyrain(year:any,div:any,dist:any,month:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=Gettehsilheadquerter&division='+div+'&district='+dist+'&month='+month+'&year='+year+ '&company_id='+this.comId);
}

circleRainfallHeavy(year:any,div:any,dist:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=Circleheavyrainfall&division='+div+'&district='+dist+'&year='+year+ '&company_id='+this.comId);
}

circleRainfallHeavyPeriod(year:any,div:any,dist:any,fromdate:any,todate:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=CircleheavyrainfallPeriod&division='+div+'&district='+dist+'&year='+year+'&fromdate='+fromdate+'&todate='+todate+ '&company_id='+this.comId );
}

CircleRainfallHeavyCount(year:any,div:any,dist:any): Observable<any> {
  return this.http.get(this.testURL + 'Maharain?type=Circleheavyrainfallcount&division='+div+'&district='+dist+'&year='+year+ '&company_id='+this.comId);
  }

  //districtrainfall
  Districtheavyrainfall(year:any,div:any,dist:any): Observable<any> {
    return this.http.get(this.testURL + 'Maharain?type=Getdistrictheavyrain&year='+year+'&division='+div+'&district='+dist+ '&company_id='+this.comId);
  }


}
