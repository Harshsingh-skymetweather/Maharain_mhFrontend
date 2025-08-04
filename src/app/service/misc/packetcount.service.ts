import { HttpClient,HttpHeaders,HttpBackend , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacketcountService {

    //TestURL='https://192.168.105.5:7240/api/'
    TestURL='https://projects.skymetweather.com/SWIMSServiceAPI/api/'

  constructor(private http:HttpClient) {
   }    

   header = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('Maharain-Token')}`,
  });

    Datapacket(): Observable<any> {
      return this.http.get(this.TestURL + 'Maharain?type=datapacketcount');
    }
    getcurrentdistrict(): Observable<any>
    {
      return this.http.get(this.TestURL + 'Station?type=district&state=Maharashtra',{headers:this.header})
    }

    getdailydistrict(divtype:any,div:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Maharain?type=getDistrictsbydivisiontype&divisiontype='+divtype+'&division='+div,{headers:this.header})
    }

    gettehsils(dist:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Station?type=tehsil&state=Maharashtra&district='+dist,{headers:this.header})
    }

    getcircles(dist:any,tehsil:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Station?type=circle&state=Maharashtra&district='+dist+'&tehsil='+tehsil,{headers:this.header})
    }

    getstation(dist:any,tehsil:any,circle:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Station?type=station&state=Maharashtra&district='+dist+'&tehsil='+tehsil+'&circle='+circle,{headers:this.header})
    }

    getdata(station:any,fromdate:any,todate:any)
    {
      return this.http.get(this.TestURL +'Maharain?type=CurrentData&station='+station+'&fromdate='+fromdate+'&todate='+todate,{headers:this.header})
    }
    getDivision(division:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Maharain?type=Divisionbytype&divtype='+division,{headers:this.header})
    }
    getdistrict(division:any): Observable<any>
    {
      return this.http.get(this.TestURL + 'Station?type=getDistrictsbydivision&state=Maharashtra&division='+division,{headers:this.header})
    }

    getdailyReport(division:any,district:any,tehsil:any,circle:any,station:any,fromdate:any,todate:any)
    {
      return this.http.get(this.TestURL +'Maharain?type=Dailyreports&division=1&district='+district+'&tehsil='+tehsil+'&circle='+circle+'&station='+station+'&fromdate='+fromdate+'&todate='+todate,{headers:this.header})
    }

    getweeklyReport(division:any,district:any,tehsil:any,circle:any,station:any,fromdate:any,todate:any)
    {
      return this.http.get(this.TestURL +'Maharain?type=Weeklyreports&division=1&district='+district+'&tehsil='+tehsil+'&circle='+circle+'&station='+station+'&fromdate='+fromdate+'&todate='+todate,{headers:this.header})
    }
    getdailyRainReport(division:any,district:any,tehsil:any,circle:any,station:any,fromdate:any,todate:any)
    {
      return this.http.get(this.TestURL +'Maharain?type=Dailyrainreports&division=1&district='+district+'&tehsil='+tehsil+'&circle='+circle+'&station='+station+'&fromdate='+fromdate+'&todate='+todate,{headers:this.header})
    }
    getstations()
    {
      return this.http.get(this.TestURL +'Maharain?type=Stationdetails',{headers:this.header})
    }
    getforecast(station:any)
    {
      return this.http.get('https://projects.skymetweather.com/serviceapi/api/forecast-daily/'+station+'?limit=3',{headers:this.header})
    }

}
