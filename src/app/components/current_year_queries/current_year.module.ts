import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { current_yearRoutingModule } from './current_year.routing.module';
import { CicrleDailyrainPeriodComponent } from './Circle/cicrle-dailyrain-period/cicrle-dailyrain-period.component';
import { CircleDailyrainSelectedMonthComponent } from './Circle/circle-dailyrain-selected-month/circle-dailyrain-selected-month.component';
import { CirdailyrainComponent } from './Circle/cirdailyrain/cirdailyrain.component';
import { CRainfallHeavyComponent } from './Circle/crainfall-heavy/crainfall-heavy.component';
import { DryspellComponent } from './Circle/dryspell/dryspell.component';
import { RainfallheavycountComponent } from './Circle/rainfallheavycount/rainfallheavycount.component';
import { DistdailyrainComponent } from './district/distdailyrain/distdailyrain.component';
import { DistheavyrainComponent } from './district/distheavyrain/distheavyrain.component';
import { DistrictDailyRainselectedmonthComponent } from './district/district-daily-rainselectedmonth/district-daily-rainselectedmonth.component';
import { DistrictDryspellComponent } from './district/district-dryspell/district-dryspell.component';
import { DistrictHeavyrainCountComponent } from './district/district-heavyrain-count/district-heavyrain-count.component';
import { DistrictHeavyrainPeriodComponent } from './district/district-heavyrain-period/district-heavyrain-period.component';
import { DivDailyrainSelectedMonthComponent } from './Division/div-dailyrain-selected-month/div-dailyrain-selected-month.component';
import { DivdailyrainComponent } from './Division/divdailyrain/divdailyrain.component';
import { DivheavyrainComponent } from './Division/divheavyrain/divheavyrain.component';
import { DivheavyraincountComponent } from './Division/divheavyraincount/divheavyraincount.component';
import { DivisionHeavyrainPeriodComponent } from './Division/division-heavyrain-period/division-heavyrain-period.component';
import { DivisiondryspellComponent } from './Division/divisiondryspell/divisiondryspell.component';
import { TehdailyrainComponent } from './Tehsil/tehdailyrain/tehdailyrain.component';
import { TehheavyrainComponent } from './Tehsil/tehheavyrain/tehheavyrain.component';
import { TehsilDailyrainForperiodComponent } from './Tehsil/tehsil-dailyrain-forperiod/tehsil-dailyrain-forperiod.component';
import { TehsilDryspellComponent } from './Tehsil/tehsil-dryspell/tehsil-dryspell.component';
import { TehsilHeavyrainCountComponent } from './Tehsil/tehsil-heavyrain-count/tehsil-heavyrain-count.component';
import { TehsilHeavyrainForperiodComponent } from './Tehsil/tehsil-heavyrain-forperiod/tehsil-heavyrain-forperiod.component';
import { TehsildailyrainSelectedMonthComponent } from './Tehsil/tehsildailyrain-selected-month/tehsildailyrain-selected-month.component';
import { TehsilhqDailyrainComponent } from './Tehsil/tehsilhq-dailyrain/tehsilhq-dailyrain.component';
import { TehsilhqDailyrainselectedmonthComponent } from './Tehsil/tehsilhq-dailyrainselectedmonth/tehsilhq-dailyrainselectedmonth.component';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { HeavyranfalleriodsssComponent } from './Circle/heavyranfalleriodsss/heavyranfalleriodsss.component';

@NgModule({
  declarations: [
    CicrleDailyrainPeriodComponent,
    CircleDailyrainSelectedMonthComponent,
    CirdailyrainComponent,
    HeavyranfalleriodsssComponent,
    CRainfallHeavyComponent,
    DryspellComponent,
    RainfallheavycountComponent,
    DistdailyrainComponent,
    DistheavyrainComponent,
    DistrictDailyRainselectedmonthComponent,
    DistrictDryspellComponent,
    DistrictHeavyrainCountComponent,
    DistrictHeavyrainPeriodComponent,
    DivDailyrainSelectedMonthComponent,
    DivdailyrainComponent,
    DivheavyrainComponent,
    DivheavyraincountComponent,
    DivisionHeavyrainPeriodComponent,
    DivisiondryspellComponent,
    TehdailyrainComponent,
    TehheavyrainComponent,
    TehsilDailyrainForperiodComponent,
    TehsilDryspellComponent,
    TehsilHeavyrainCountComponent,
    TehsilHeavyrainForperiodComponent,
    TehsildailyrainSelectedMonthComponent,
    TehsilhqDailyrainComponent,
    TehsilhqDailyrainselectedmonthComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    current_yearRoutingModule,
    // BrowserModule,
    sidenavigationModule
  ]
})
export class current_yearModule { }
