import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CircleCountCurrentMonthComponent } from './component/circle/circle-count-current-month/circle-count-current-month.component';
import { CircleCountSelectedMonthComponent } from './component/circle/circle-count-selected-month/circle-count-selected-month.component';
import { CircleListSelectedMonthComponent } from './component/circle/circle-list-selected-month/circle-list-selected-month.component';
import { CirclePercentageSelectedMonthComponent } from './component/circle/circle-percentage-selected-month/circle-percentage-selected-month.component';
import { ListMonthComponent } from './component/circle/list-month/list-month.component';
import { PercentageMonthComponent } from './component/circle/percentage-month/percentage-month.component';
import { CountcurrentmonthComponent } from './component/circleDistrictwise/countcurrentmonth/countcurrentmonth.component';
import { CountprogressiveComponent } from './component/circleDistrictwise/countprogressive/countprogressive.component';
import { CountComponent } from './component/district/count/count.component';
import { ListComponent } from './component/district/list/list.component';
import { PercentageComponent } from './component/district/percentage/percentage.component';
import { TehsilCountCurrentMonthComponent } from './component/Tehsil/tehsil-count-current-month/tehsil-count-current-month.component';
import { TehsilCountProgressiveComponent } from './component/Tehsil/tehsil-count-progressive/tehsil-count-progressive.component';
import { TehsilCountSelectedMonthComponent } from './component/Tehsil/tehsil-count-selected-month/tehsil-count-selected-month.component';
import { TehsilListCurrentMonthComponent } from './component/Tehsil/tehsil-list-current-month/tehsil-list-current-month.component';
import { IntensityRoutingModule } from './Intensity-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { IntensityComponent } from './intensity.component';
import { IntComponent } from './component/int.component';
import { logoutModule } from 'src/app/logout/logout.module';
import { CircledistrictwisecountcurrentmonthComponent } from './circleDistrictwise/circledistrictwisecountcurrentmonth/circledistrictwisecountcurrentmonth.component';
import { CircledistrcitwisecountprogressiveComponent } from './circleDistrictwise/circledistrcitwisecountprogressive/circledistrcitwisecountprogressive.component';
import { CirclePercentageProgressiveComponent } from './component/circle/circle-percentage-progressive/circle-percentage-progressive.component';
import { CircleCountProgressiveComponent } from './component/circle/circle-count-progressive/circle-count-progressive.component';
import { CircleListProgressiveComponent } from './component/circle/circle-list-progressive/circle-list-progressive.component';
import { DistCountSelectedMonthComponent } from './component/district/dist-count-selected-month/dist-count-selected-month.component';
import { DistCountProgressiveComponent } from './component/district/dist-count-progressive/dist-count-progressive.component';
import { DistListSelectedMonthComponent } from './component/district/dist-list-selected-month/dist-list-selected-month.component';
import { DistListProgressiveComponent } from './component/district/dist-list-progressive/dist-list-progressive.component';
import { DistPercentageSelectedMonthComponent } from './component/district/dist-percentage-selected-month/dist-percentage-selected-month.component';
import { DistPercentageProgressiveComponent } from './component/district/dist-percentage-progressive/dist-percentage-progressive.component';
import { TehsilPercentageCurrentMonthComponent } from './component/Tehsil/tehsil-percentage-current-month/tehsil-percentage-current-month.component';
import { TehsilPercentageProgressiveComponent } from './component/Tehsil/tehsil-percentage-progressive/tehsil-percentage-progressive.component';
import { TehsilPercentageSelectedMonthComponent } from './component/Tehsil/tehsil-percentage-selected-month/tehsil-percentage-selected-month.component';
import { TehsilListSelectedMonthComponent } from './component/Tehsil/tehsil-list-selected-month/tehsil-list-selected-month.component';
import { TehsilListProgressiveComponent } from './component/Tehsil/tehsil-list-progressive/tehsil-list-progressive.component';
import { CircleCountSeasonComponent } from './component/circle/circle-count-season/circle-count-season.component';
import { TehsilCountSeasonComponent } from './component/Tehsil/tehsil-count-season/tehsil-count-season.component';
@NgModule({
  declarations: [
    CircleCountCurrentMonthComponent,
    CircleCountSelectedMonthComponent,
    CircleListSelectedMonthComponent,
    CirclePercentageSelectedMonthComponent,
    ListMonthComponent,
    PercentageMonthComponent,
    CountcurrentmonthComponent,
    CountprogressiveComponent,
    CountComponent,
    ListComponent,
    PercentageComponent,
    TehsilCountCurrentMonthComponent,
    TehsilCountProgressiveComponent,
    TehsilCountSelectedMonthComponent,
    TehsilListCurrentMonthComponent,
    IntensityComponent,
    IntComponent,
    CircledistrictwisecountcurrentmonthComponent,
    CircledistrcitwisecountprogressiveComponent,
    CirclePercentageProgressiveComponent,
    CircleCountProgressiveComponent,
    CircleListProgressiveComponent,
    DistCountSelectedMonthComponent,
    DistCountProgressiveComponent,
    DistListSelectedMonthComponent,
    DistListProgressiveComponent,
    DistPercentageSelectedMonthComponent,
    DistPercentageProgressiveComponent,
    TehsilPercentageCurrentMonthComponent,
    TehsilPercentageProgressiveComponent,
    TehsilPercentageSelectedMonthComponent,
    TehsilListSelectedMonthComponent,
    TehsilListProgressiveComponent,
    CircleCountSeasonComponent,
    TehsilCountSeasonComponent,


  ],
  imports: [
    CommonModule,
    IntensityRoutingModule,
    FormsModule,
    logoutModule,
    sidenavigationModule,
    HttpClientModule,


  ],
  exports: [
    CircleCountCurrentMonthComponent,
    CircleCountSelectedMonthComponent,
    CircleListSelectedMonthComponent,
    CirclePercentageSelectedMonthComponent,
    ListMonthComponent,
    PercentageMonthComponent,
    CountcurrentmonthComponent,
    CountprogressiveComponent,
    CountComponent,
    ListComponent,
    PercentageComponent,
    TehsilCountCurrentMonthComponent,
    TehsilCountProgressiveComponent,
    TehsilCountSelectedMonthComponent,
    TehsilListCurrentMonthComponent,
    IntensityComponent,
    IntComponent,
  ]

})
export class IntensityModule { }
