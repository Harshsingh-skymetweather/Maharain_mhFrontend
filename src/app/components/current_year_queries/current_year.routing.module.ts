import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { HeavyranfalleriodsssComponent } from './Circle/heavyranfalleriodsss/heavyranfalleriodsss.component';


const routes: Routes = [
    { path: 'cir-daily-rain-Period', component: CicrleDailyrainPeriodComponent, },
    { path: 'cir-daily-rain-selected-month', component: CircleDailyrainSelectedMonthComponent, },
    { path: 'cir-dailyrain', component: CirdailyrainComponent, },
    { path: 'heavy-rainfall', component: CRainfallHeavyComponent, },
    { path: 'cir-heavy-rainfall-Period', component: HeavyranfalleriodsssComponent, },

    { path: 'circle-Dryspell', component: DryspellComponent, },
    { path: 'heavy-rainfall-count', component: RainfallheavycountComponent, },
    { path: 'dist-dailyrain', component: DistdailyrainComponent, },
    { path: 'dist-heavyrain', component: DistheavyrainComponent, },
    { path: 'district-dailyrain-selectedmonth', component: DistrictDailyRainselectedmonthComponent, },
    { path: 'district-dryspell', component: DistrictDryspellComponent, },
    { path: 'distrcit-heavy-rain-count', component: DistrictHeavyrainCountComponent, },
    { path: 'district-heavyrain-period', component: DistrictHeavyrainPeriodComponent, },
    { path: 'division-daily-rain-selected-month', component: DivDailyrainSelectedMonthComponent, },
    { path: 'divdaily-rain', component: DivdailyrainComponent, },
    { path: 'div-heavyrain', component: DivheavyrainComponent, },
    { path: 'div-heavyraincount', component: DivheavyraincountComponent, },
    { path: 'division-heavyrain-period', component: DivisionHeavyrainPeriodComponent, },
    { path: 'division-Dryspell', component: DivisiondryspellComponent, },


    { path: 'teh-dailyrain', component: TehdailyrainComponent, },
    { path: 'teh-heavyrain', component: TehheavyrainComponent, },
    { path: 'tehsil-dailyrain-for-period', component: TehsilDailyrainForperiodComponent, },
    { path: 'tehsil-dryspell', component: TehsilDryspellComponent, },
    { path: 'tehsil-heavyrainfall-count', component: TehsilHeavyrainCountComponent, },
    { path: 'tehsil-heavyrain-for-period', component: TehsilHeavyrainForperiodComponent, },
    { path: 'tehsil-daily-rain-selected-month', component: TehsildailyrainSelectedMonthComponent, },
    { path: 'tehsilhq-daily-rain-current-month', component: TehsilhqDailyrainComponent, },
    { path: 'tehsilhq-daily-rain-selected-month', component: TehsilhqDailyrainselectedmonthComponent, },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class current_yearRoutingModule { }
