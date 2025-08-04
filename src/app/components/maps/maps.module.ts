import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatecurrentmonthComponent } from './State/statecurrentmonth/statecurrentmonth.component';
import { MapsRoutingModule } from './maps-routing.module';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { DivisioncurrentmonthComponent } from './Division/divisioncurrentmonth/divisioncurrentmonth.component';
import { DistrictCurrentMonthComponent } from './District/district-current-month/district-current-month.component';
import { StateprogressiveComponent } from './stateprogressive/stateprogressive.component';
import { DistrictProgressiveComponent } from './district-progressive/district-progressive.component';
import { DistrictselectedmonthComponent } from './districtselectedmonth/districtselectedmonth.component';
import { DivisionselectedmonthComponent } from './divisionselectedmonth/divisionselectedmonth.component';
import { DivisionprogressiveComponent } from './divisionprogressive/divisionprogressive.component';
import { StateselectedmonthComponent } from './State/stateselectedmonth/stateselectedmonth.component';
import { StateperiodicComponent } from './State/stateperiodic/stateperiodic.component';
import { StateperiodicdailyComponent } from './State/stateperiodicdaily/stateperiodicdaily.component';

@NgModule({
  declarations: [
    StatecurrentmonthComponent,
    DivisioncurrentmonthComponent,
    DistrictCurrentMonthComponent,
    StateprogressiveComponent,
    DistrictProgressiveComponent,
    DistrictselectedmonthComponent,
    DivisionselectedmonthComponent,
    DivisionprogressiveComponent,
    StateselectedmonthComponent,
    StateperiodicComponent,
    StateperiodicdailyComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    sidenavigationModule,
    FormsModule
  ]
})
export class MapsModule { }
