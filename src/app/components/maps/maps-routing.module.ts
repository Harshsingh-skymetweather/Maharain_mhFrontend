import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatecurrentmonthComponent } from './State/statecurrentmonth/statecurrentmonth.component';
import { DivisioncurrentmonthComponent } from './Division/divisioncurrentmonth/divisioncurrentmonth.component';
import { DistrictCurrentMonthComponent } from './District/district-current-month/district-current-month.component';
import { StateprogressiveComponent } from './stateprogressive/stateprogressive.component';
import { DivisionprogressiveComponent } from './divisionprogressive/divisionprogressive.component';
import { DistrictselectedmonthComponent } from './districtselectedmonth/districtselectedmonth.component';
import { DivisionselectedmonthComponent } from './divisionselectedmonth/divisionselectedmonth.component';
import { DistrictProgressiveComponent } from './district-progressive/district-progressive.component';
import { StateselectedmonthComponent } from './State/stateselectedmonth/stateselectedmonth.component';
import { StateperiodicComponent } from './State/stateperiodic/stateperiodic.component';
import { StateperiodicdailyComponent } from './State/stateperiodicdaily/stateperiodicdaily.component';


const routes: Routes = [
  { path: 'state-current-month', component: StatecurrentmonthComponent, },
  { path: 'state-selected-month',component:StateselectedmonthComponent, },
  { path: 'state-Progressive', component: StateprogressiveComponent, },
  { path: 'state-periodic', component:StateperiodicComponent},
  { path: 'state-periodic-daily', component:StateperiodicdailyComponent},
  { path: 'division-current-month', component: DivisioncurrentmonthComponent, },
  { path: 'division-progressive', component: DivisionprogressiveComponent, },
  { path: 'division-selected-month', component: DivisionselectedmonthComponent, },
  { path: 'district-current-month', component: DistrictCurrentMonthComponent, },
  { path: 'district-progressive', component: DistrictProgressiveComponent, },
  { path: 'district-selected-month', component: DistrictselectedmonthComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
