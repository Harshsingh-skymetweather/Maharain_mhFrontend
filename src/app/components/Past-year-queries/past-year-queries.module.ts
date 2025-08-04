import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CirclePastheavyRainCountComponent } from './Circle/circle-pastheavy-rain-count/circle-pastheavy-rain-count.component';
import { CirclePastyearDryspellComponent } from './Circle/circle-pastyear-dryspell/circle-pastyear-dryspell.component';
import { CirclepastyearDailyrainComponent } from './Circle/circlepastyear-dailyrain/circlepastyear-dailyrain.component';
import { CirclepastyearHeavyrainfallComponent } from './Circle/circlepastyear-heavyrainfall/circlepastyear-heavyrainfall.component';
import { DistrictPastyearDailyrainComponent } from './District/district-pastyear-dailyrain/district-pastyear-dailyrain.component';
import { DistrictPastyearDryspellComponent } from './District/district-pastyear-dryspell/district-pastyear-dryspell.component';
import { DistrictPastyearHeavyrainfallComponent } from './District/district-pastyear-heavyrainfall/district-pastyear-heavyrainfall.component';
import { DistrictPastyearHeavyrainfallcountComponent } from './District/district-pastyear-heavyrainfallcount/district-pastyear-heavyrainfallcount.component';
import { DistrictPastyearMonthydistRainComponent } from './District/district-pastyear-monthydist-rain/district-pastyear-monthydist-rain.component';
import { DivisionPastYearRainComponent } from './Division/division-past-year-rain/division-past-year-rain.component';
import { DivisionPastyearDryspellComponent } from './Division/division-pastyear-dryspell/division-pastyear-dryspell.component';
import { DivisionPastyearHeavyrainfallComponent } from './Division/division-pastyear-heavyrainfall/division-pastyear-heavyrainfall.component';
import { DivisionPastyearHeavyrainfallcountComponent } from './Division/division-pastyear-heavyrainfallcount/division-pastyear-heavyrainfallcount.component';
import { DivisionPastyearMonthydivRainComponent } from './Division/division-pastyear-monthydiv-rain/division-pastyear-monthydiv-rain.component';
import { TehsiPastyearDailyrainComponent } from './Tehsil/tehsi-pastyear-dailyrain/tehsi-pastyear-dailyrain.component';
import { TehsilPastyearDryspellComponent } from './Tehsil/tehsil-pastyear-dryspell/tehsil-pastyear-dryspell.component';
import { TehsilPastyearHeavyrainComponent } from './Tehsil/tehsil-pastyear-heavyrain/tehsil-pastyear-heavyrain.component';
import { TehsilPastyearHeavyraincountComponent } from './Tehsil/tehsil-pastyear-heavyraincount/tehsil-pastyear-heavyraincount.component';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { pastyearRoutingModule } from './past-year-routing.module';
import { CirclePastYearMonthlyCircleRainComponent } from './Circle/circlePastYear-monthlyCircleRain/circlePastYear-monthlyCircleRain.component';
import { TehsilPastYearMonthlyTehsilRainComponent } from './Tehsil/tehsil-PastYear-monthlyTehsilRain/tehsil-PastYear-monthlyTehsilRain.component';
@NgModule({
  declarations: [
    CirclePastheavyRainCountComponent,
    CirclePastyearDryspellComponent,
    CirclepastyearDailyrainComponent,
    CirclepastyearHeavyrainfallComponent,
    CirclePastYearMonthlyCircleRainComponent,
    DistrictPastyearDailyrainComponent,
    DistrictPastyearDryspellComponent,
    DistrictPastyearHeavyrainfallComponent,
    DistrictPastyearHeavyrainfallcountComponent,
    DistrictPastyearMonthydistRainComponent,
    DivisionPastYearRainComponent,
    DivisionPastyearDryspellComponent,
    DivisionPastyearHeavyrainfallComponent,
    DivisionPastyearHeavyrainfallcountComponent,
    DivisionPastyearMonthydivRainComponent,
    TehsiPastyearDailyrainComponent,
    TehsilPastyearDryspellComponent,
    TehsilPastyearHeavyrainComponent,
    TehsilPastyearHeavyraincountComponent,
    TehsilPastYearMonthlyTehsilRainComponent,
    
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrowserModule,
    pastyearRoutingModule,
    sidenavigationModule
  ]
})
export class pastyearqueriesModule { }