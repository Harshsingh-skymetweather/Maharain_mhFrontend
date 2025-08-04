import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { CirclePastYearMonthlyCircleRainComponent } from './Circle/circlePastYear-monthlyCircleRain/circlePastYear-monthlyCircleRain.component';
import { TehsilPastYearMonthlyTehsilRainComponent } from './Tehsil/tehsil-PastYear-monthlyTehsilRain/tehsil-PastYear-monthlyTehsilRain.component';




const routes: Routes = [
    { path: 'circle-pastyear-Heavyrainfall-count', component: CirclePastheavyRainCountComponent, },
    { path: 'circle-pastyear-Dryspell', component: CirclePastyearDryspellComponent, },
    { path: 'circle-pastyear-Monthly-circle-rain', component: CirclePastYearMonthlyCircleRainComponent, },
    { path: 'circle-pastyear-dailyrain', component: CirclepastyearDailyrainComponent, },
    { path: 'circle-pastyear-Heavyrainfall', component: CirclepastyearHeavyrainfallComponent, },
    { path: 'district-pastyear-dailyrain', component: DistrictPastyearDailyrainComponent, },
    { path: 'district-pastyear-dryspell', component: DistrictPastyearDryspellComponent, },
    { path: 'district-pastyear-heavyrainfall', component: DistrictPastyearHeavyrainfallComponent, },
    { path: 'district-pastyear-heavyrainfallcount', component: DistrictPastyearHeavyrainfallcountComponent, },
    { path: 'district-past-yearmonthy-rain', component: DistrictPastyearMonthydistRainComponent, },
    { path: 'division-pastyear-dailyrain', component: DivisionPastYearRainComponent, },
    { path: 'division-past-year-Dryspell', component: DivisionPastyearDryspellComponent, },
    { path: 'division-past-year-heavyrainfall', component: DivisionPastyearHeavyrainfallComponent, },
    { path: 'division-past-year-heavyrainfallCount', component: DivisionPastyearHeavyrainfallcountComponent, },
    { path: 'division-past-year-monthyly-division-rain', component: DivisionPastyearMonthydivRainComponent, },
    { path: 'tehsil-pastyear-Dailyrain', component: TehsiPastyearDailyrainComponent, },
    { path: 'tehsil-pastyear-Dryspell', component: TehsilPastyearDryspellComponent, },
    { path: 'tehsil-pastyear-Heavyrainfall', component: TehsilPastyearHeavyrainComponent, },
    { path: 'tehsil-pastyear-Heavyrainfall-count', component: TehsilPastyearHeavyraincountComponent, },
    { path:'tehsil-pastyear-monthly-tehsil-rain',component:TehsilPastYearMonthlyTehsilRainComponent,}
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pastyearRoutingModule { }
