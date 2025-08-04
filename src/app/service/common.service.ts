import { HttpClient,HttpHeaders,HttpBackend , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseURL = 'https://projects.skymetweather.com/SWIMSServiceAPI/api/'
 //TestURL='https://192.168.105.5:7240/api/'
  TestURL='https://projects.skymetweather.com/SWIMSServiceAPI/api/'

  Token1:any;
  comId:any;
  constructor(private http:HttpClient, private httpBackend: HttpBackend,private router:Router)
  {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const queryParams = new URLSearchParams(this.router.url.split('?')[1]);
        this.comId = queryParams.get('company_id');
      }
      console.log(this.comId,'companyid')
    })
  }

  getDivisions(): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Division');
  }

  getDivisionsC(companyId:any): Observable<any> {
    return this.http.get( this.baseURL + 'Maharain?type=Division&company_id='+this.comId);
  }


  getcompanydivisions(): Observable<any> {
    return this.http.get( this.baseURL + 'Maharain?type=Division&company_id='+this.comId);
  }



  getDistrict(title:any): Observable<any> {
    console.log(this.baseURL + 'Maharain?type=DivisionsDistricts&division='+title +'&company_id='+this.comId);
    return this.http.get(this.baseURL + 'Maharain?type=DivisionsDistricts&division='+title +'&company_id='+this.comId);
  }

  getDistrictCompany(title:any,company_id:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=DivisionsDistricts&division='+title+'&Company_id='+company_id);
  }

  DivisionReportjune(div:any,dist:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=CircleJuneReport&division='+div+'&district='+dist+'&Company_id='+this.comId);
  }

  RangeReport(div:any,dist:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=get_range_circle_data&division='+div+'&district='+'&Company_id='+this.comId);
  }

  getCircleSeasonReport(div:any):Observable<any>{
    return this.http.get(this.baseURL + 'Maharain?type=CircleSeasonReport&division='+div+'&company_id='+this.comId);
  }

  getDistrictIntensity(): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=districtIntensityCount'+'&company_id='+this.comId);
  }

  // getcirclePercentage(): Observable<any> {
  //   return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageIntensity',{headers:this.Token1});
  // }





  countcurrentmonth(progressive:any):Observable<any>{
    return this.http.get(this.baseURL + 'Maharain?type=CircleIntensityDistrictwise&search=Circle_district_wise'+'&company_id='+this.comId);
  }



   TehsilRangeReport(division:any,district:any,fromDate:any,todate:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?Division=&type=gettehsildailyrainforPeriod&fromDate='+fromDate+'&toDate='+todate+'&district='+district +'&company_id='+this.comId);
  }


  tehsilJunseptReport(div:any,dist:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=get_junesept_tehsil_data&division='+div+'&district='+dist+'&company_id='+this.comId);
  }



//Divisiondailyrain
  DivisiondailyRainReport(year:any,month:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdivisiondataasdayfunction&month='+month+'&year='+year+'&company_id='+this.comId);
  }

  Divisionheavyrainfall(year:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=GetdivisionRainfallheavy&year='+year+'&company_id='+this.comId);
  }

  Divisionheavyrainfallcount(year:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Getdivisionheayrainfallcount&year='+year+'&company_id='+this.comId);
  }

  DivisionDryspell(year:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdivisiondryspell&year='+year+'&company_id='+this.comId);
  }
  DivisiondurationDryspell(year:any,div:any,fromDate:any,toDate:any,fromDuration:any,toDuration:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdivisiondryspell&year='+year+'&division='+div+'&fromdate='+fromDate+'&todate='+toDate+'&fromduration='+fromDuration+'&toduration='+toDuration+'&company_id='+this.comId);
  }



//Districtqueries

  Districtdailyrainasday(div:any,dist:any,month:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdistrictdataasday&division='+div+'&district='+dist+'&month='+month+'&company_id='+this.comId);
  }
  PastDistrictdailyrainasday(div:any,year:any,month:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Getdistrictdataasday&division='+div+'&year='+year+'&month='+month+'&company_id='+this.comId);
  }


  DistrictheavyrainfallPeriod(year:any,div:any,dist:any,fromDate:any,todate:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdistrictheavyrain&fromdate='+fromDate+'&todate='+todate+'&division='+div+'&district='+dist+'&company_id='+this.comId);
  }

  Districtheavyrainfallcount(year:any,div:any,dist:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdistrictheavyraincount&year='+year+'&division='+div+'&district='+dist+'&company_id='+this.comId);
  }

  DistrictDryspell(year:any,div:any,dist:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdistrictdryspell&year='+year+'&division='+div+'&district='+dist +'&company_id='+this.comId);
  }

  PDistrictDryspell(year:any,div:any,dist:any,fromDate:any,toDate:any,fromDuration:any,toDuration:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getdistrictdryspell&year='+year+'&division='+div+'&district='+dist +'&fromdate='+fromDate+'&todate='+toDate+'&fromduration='+fromDuration+'&toduration='+toDuration+'&company_id='+this.comId);
  }

  //circlequeries
  circleDailyRain(year:any,div:any,dist:any,month:any): Observable<any> {
    return this.http.get(this.TestURL + 'Maharain?type=Getcircledataasday&division='+div+'&district='+dist+'&month='+month+'&year='+year+'&company_id='+this.comId);
  }

  circleRainfallHeavy(year:any,div:any,dist:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Circleheavyrainfall&division='+div+'&district='+dist+'&year='+year+'&company_id='+this.comId);
  }

  CircleRainfallHeavyCount(year:any,div:any,dist:any): Observable<any> {
  return this.http.get(this.baseURL + 'Maharain?type=Circleheavyrainfallcount&division='+div+'&district='+dist+'&year='+year+'&company_id='+this.comId);
  }

  CircleDryspell(year:any,div:any,dist:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Circledryspell&division='+div+'&district='+dist+'&year='+year +'&company_id='+this.comId);
    }

  PCircleDryspell(year:any,div:any,dist:any,fromDate:any,toDate:any,fromDuration:any,toDuration:any): Observable<any> {
      return this.http.get(this.TestURL + 'Maharain?type=Circledryspell&year='+year+'&division='+div+'&district='+dist +'&fromdate='+fromDate+'&todate='+toDate+'&fromduration='+fromDuration+'&toduration='+toDuration+'&company_id='+this.comId);
  }

 //Tehsilqueries
    TehsilDailyrain(year:any,div:any,dist:any,month:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=Gettehsildataasday&division='+div+'&district='+dist+'&month='+month+'&year='+year+'&company_id='+this.comId);
    }

    // TehsilDailyrainforPeriod(div:any,dist:any,fromDate:any,toDate:any): Observable<any> {
    //   return this.http.get(this.baseURL + 'Maharain?type=gettehsildailyrainforPeriod&division='+div+'&district='+dist+'&fromDate='+fromDate+'&toDate='+toDate, {headers:this.Token1});
    // }

   Tehsilheavyrainfall(year:any,div:any,dist:any,month:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=gettehsilheavyrain&division='+div+'&district='+dist+'&month='+month+'&year='+year+'&company_id='+this.comId);
    }

    TehsilheavyrainfallCount(year:any,div:any,dist:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=gettehsilheavyrainCount&division='+div+'&district='+dist+'&year='+year+'&company_id='+this.comId);
    }

    Tehsilheavydryspell(year:any,div:any,dist:any): Observable<any> {
      return this.http.get(this.baseURL + 'Maharain?type=gettehsildryspell&division='+div+'&district='+dist+'&year='+year+'&company_id='+this.comId);
    }


  //Intensity
  circleList(month:any):Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=CircleIntensityList&month='+month,+'&company_id='+this.comId);
  }

  getIntensityPercentData(): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?Division=&type=getDistrictPercentagedata'+'&company_id='+this.comId);
  }


  getCirclePercentageIntensity(selDivisionCode:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=getCirclePercentageIntensity'+'&company_id='+this.comId);
  }

  getdivisionheavyrainforperiod(fromdate:any,todate:any): Observable<any> {
    return this.http.get(this.baseURL + 'Maharain?type=Getdivisionheavyrainfallforperiod&fromdate='+fromdate+'&todate='+todate+'&company_id='+this.comId);
  }

  CircleIntensityCount(month:any): Observable<any> {
    return this.http.get( this.baseURL + 'Maharain?type=CircleIntensityCount&month='+month+'&company_id='+this.comId);
  }


  login(formval:any): Observable<any> {
    return this.http.post('https://projects.skymetweather.com/SWIMSServiceAPI/api/Authenticate/token',formval);
  }

}
