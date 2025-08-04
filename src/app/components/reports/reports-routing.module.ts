import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
    { path: 'june', component: JuneComponent, },
    { path: 'june-december', component: JuneDecemberComponent, },
    { path: 'june-september', component: JuneSeptComponent, },
    { path: 'month-wise', component: MonthWiseComponent, },
    { path: 'rain-compare', component: RainCompareComponent, },
    { path: 'season', component: SeasonComponent, },
    { path: 'distjun-dec', component: DistjunDecComponent, },
    { path: 'distjun-report', component: DistjunReportComponent, },
    { path: 'distjun-sept', component: DistjunSeptComponent, },
    { path: 'dist-monthwise', component: DistmonthWiseComponent, },
    { path: 'dist-season', component: DistseasonComponent, },
    { path: 'divjun-dec', component: DivjunDecComponent, },
    { path: 'Divjun-report', component: DivjunReportComponent, },
    { path: 'divjun-sept', component: DivjunSeptComponent, },
    { path: 'div-monthwise', component: DivmonthWiseComponent, },
    { path: 'Divseason-Component', component: DivseasonComponent, },
    { path: 'tehsil-jundec', component: TehjunDecComponent, },
    { path: 'tehsil-junreport', component: TehjunReportComponent, },
    { path: 'tehsil-junsept', component: TehjunSeptComponent, },
    { path: 'tehsil-monthwise', component: TehmonthwiseComponent, },
    { path: 'tehsil-season', component: TehseasonComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reportsRoutingModule { }
