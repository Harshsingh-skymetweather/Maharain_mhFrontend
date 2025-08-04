import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PastYearIntensityRoutingModule } from './past-year-intensity-routing.module';
import { sidenavigationModule } from '../side-navigation/side-navigation.module';
import { PastyearcircleintensityComponent } from './circle/pastyearcircleintensity/pastyearcircleintensity.component';
import { PastyearcirclecountComponent } from './circle/pastyearcirclecount/pastyearcirclecount.component';
import { PastyeartehsilintensityComponent } from './Tehsil/pastyeartehsilintensity/pastyeartehsilintensity.component';
import { PastyeartehsilcountComponent } from './Tehsil/pastyeartehsilcount/pastyeartehsilcount.component';

@NgModule({
  declarations: [
    PastyearcircleintensityComponent,
    PastyearcirclecountComponent,
    PastyeartehsilintensityComponent,
    PastyeartehsilcountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PastYearIntensityRoutingModule,
    sidenavigationModule
  ]
})
export class PastYearIntensityModule { }
