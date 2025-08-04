import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastyearcircleintensityComponent } from './circle/pastyearcircleintensity/pastyearcircleintensity.component';
import { PastyearcirclecountComponent } from './circle/pastyearcirclecount/pastyearcirclecount.component';
import { PastyeartehsilintensityComponent } from './Tehsil/pastyeartehsilintensity/pastyeartehsilintensity.component';
import { PastyeartehsilcountComponent } from './Tehsil/pastyeartehsilcount/pastyeartehsilcount.component';


const routes: Routes = [
  { path: 'Past-circle-intensity', component: PastyearcircleintensityComponent, },
  { path: 'Past-circle-count', component: PastyearcirclecountComponent, },
  { path: 'Past-Tehsil-intensity', component: PastyeartehsilintensityComponent, },
  { path: 'Past-Tehsil-count', component: PastyeartehsilcountComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastYearIntensityRoutingModule { }
