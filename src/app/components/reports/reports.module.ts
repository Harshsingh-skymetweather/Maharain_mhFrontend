import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JuneComponent } from './Circle/june/june.component';
import { JuneDecemberComponent } from './Circle/june-december/june-december.component';
import { JuneSeptComponent } from './Circle/june-sept/june-sept.component';
import { MonthWiseComponent } from './Circle/month-wise/month-wise.component';
import { RainCompareComponent } from './Circle/rain-compare/rain-compare.component';
import { SeasonComponent } from './Circle/season/season.component';
import { DistjunDecComponent } from './District/distjun-dec/distjun-dec.component';
import { DistjunReportComponent } from './District/distjun-report/distjun-report.component';
import { DistjunSeptComponent } from './District/distjun-sept/distjun-sept.component';
import { DistmonthWiseComponent } from './District/distmonth-wise/distmonth-wise.component';
import { DistseasonComponent } from './District/distseason/distseason.component';
import { DivjunDecComponent } from './Division/divjun-dec/divjun-dec.component';
import { DivjunReportComponent } from './Division/divjun-report/divjun-report.component';
import { DivjunSeptComponent } from './Division/divjun-sept/divjun-sept.component';
import { DivmonthWiseComponent } from './Division/divmonth-wise/divmonth-wise.component';
import { DivseasonComponent } from './Division/divseason/divseason.component';
import { TehjunDecComponent } from './Tehsil/tehjun-dec/tehjun-dec.component';
import { TehjunReportComponent } from './Tehsil/tehjun-report/tehjun-report.component';
import { TehjunSeptComponent } from './Tehsil/tehjun-sept/tehjun-sept.component';
import { TehmonthwiseComponent } from './Tehsil/tehmonthwise/tehmonthwise.component';
import { TehseasonComponent } from './Tehsil/tehseason/tehseason.component';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { reportsRoutingModule } from './reports-routing.module';
@NgModule({
  declarations: [
    JuneComponent,
    JuneDecemberComponent,
    JuneSeptComponent,
    MonthWiseComponent,
    RainCompareComponent,
    SeasonComponent,
    DistjunDecComponent,
    DistjunReportComponent,
    DistjunSeptComponent,
    DistmonthWiseComponent,
    DistseasonComponent,
    DivjunDecComponent,
    DivjunReportComponent,
    DivjunSeptComponent,
    DivmonthWiseComponent,
    DivseasonComponent,
    TehjunDecComponent,
    TehjunReportComponent,
    TehjunSeptComponent,
    TehmonthwiseComponent,
    TehseasonComponent,
 


  ],
  imports: [
    CommonModule,
    FormsModule,
    reportsRoutingModule,
    // BrowserModule,
    sidenavigationModule
  ]
})
export class reportsModule { }