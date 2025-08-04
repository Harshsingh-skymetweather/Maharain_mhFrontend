import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleCountCurrentMonthComponent } from './component/circle/circle-count-current-month/circle-count-current-month.component';
import { CircleCountSelectedMonthComponent } from './component/circle/circle-count-selected-month/circle-count-selected-month.component';
import { CircleListSelectedMonthComponent } from './component/circle/circle-list-selected-month/circle-list-selected-month.component';
import { CirclePercentageSelectedMonthComponent } from './component/circle/circle-percentage-selected-month/circle-percentage-selected-month.component';
import { ListMonthComponent } from './component/circle/list-month/list-month.component';
import { PercentageMonthComponent } from './component/circle/percentage-month/percentage-month.component';
import { CirclePercentageProgressiveComponent } from './component/circle/circle-percentage-progressive/circle-percentage-progressive.component';
import { CircleListProgressiveComponent } from './component/circle/circle-list-progressive/circle-list-progressive.component';
import { CircleCountProgressiveComponent } from './component/circle/circle-count-progressive/circle-count-progressive.component';
import { CircleCountSeasonComponent } from './component/circle/circle-count-season/circle-count-season.component';
import { TehsilPercentageCurrentMonthComponent } from './component/Tehsil/tehsil-percentage-current-month/tehsil-percentage-current-month.component';
import { TehsilPercentageProgressiveComponent } from './component/Tehsil/tehsil-percentage-progressive/tehsil-percentage-progressive.component';
import { TehsilPercentageSelectedMonthComponent } from './component/Tehsil/tehsil-percentage-selected-month/tehsil-percentage-selected-month.component';
import { TehsilCountCurrentMonthComponent } from './component/Tehsil/tehsil-count-current-month/tehsil-count-current-month.component';
import { TehsilCountProgressiveComponent } from './component/Tehsil/tehsil-count-progressive/tehsil-count-progressive.component';
import { TehsilCountSelectedMonthComponent } from './component/Tehsil/tehsil-count-selected-month/tehsil-count-selected-month.component';
import { TehsilListCurrentMonthComponent } from './component/Tehsil/tehsil-list-current-month/tehsil-list-current-month.component';
import { TehsilListProgressiveComponent } from './component/Tehsil/tehsil-list-progressive/tehsil-list-progressive.component';
import { TehsilListSelectedMonthComponent } from './component/Tehsil/tehsil-list-selected-month/tehsil-list-selected-month.component';
import { TehsilCountSeasonComponent } from './component/Tehsil/tehsil-count-season/tehsil-count-season.component';


import { CountComponent } from './component/district/count/count.component';
import { ListComponent } from './component/district/list/list.component';
import { PercentageComponent } from './component/district/percentage/percentage.component';
import { DistCountProgressiveComponent } from './component/district/dist-count-progressive/dist-count-progressive.component';
import { DistCountSelectedMonthComponent } from './component/district/dist-count-selected-month/dist-count-selected-month.component';
import { DistListProgressiveComponent } from './component/district/dist-list-progressive/dist-list-progressive.component';
import { DistListSelectedMonthComponent } from './component/district/dist-list-selected-month/dist-list-selected-month.component';
import { DistPercentageProgressiveComponent } from './component/district/dist-percentage-progressive/dist-percentage-progressive.component';
import { DistPercentageSelectedMonthComponent } from './component/district/dist-percentage-selected-month/dist-percentage-selected-month.component';


import { CircledistrictwisecountcurrentmonthComponent } from './circleDistrictwise/circledistrictwisecountcurrentmonth/circledistrictwisecountcurrentmonth.component';
import { CircledistrcitwisecountprogressiveComponent } from './circleDistrictwise/circledistrcitwisecountprogressive/circledistrcitwisecountprogressive.component';

const routes: Routes = [

          { path: 'cirle-percentage-current-month', component: PercentageMonthComponent, },
          { path: 'circle-percentage-progressive',component:CirclePercentageProgressiveComponent},
          { path: 'circle-Percentage-selected-month', component: CirclePercentageSelectedMonthComponent, },
          { path: 'circle-list-current-month', component: ListMonthComponent, },
          { path: 'circle-list-progressive',component:CircleListProgressiveComponent},
          { path: 'circle-list-selected-month', component: CircleListSelectedMonthComponent, },
          { path: 'circle-count-current-month', component: CircleCountCurrentMonthComponent, },
          { path: 'circle-count-progressive',component:CircleCountProgressiveComponent},
          { path: 'circle-count-selected-month', component: CircleCountSelectedMonthComponent, },
          {path: 'circle-count-season' ,component:CircleCountSeasonComponent},

          { path: 'tehsil-percentage-current-month', component: TehsilPercentageCurrentMonthComponent, },
          { path: 'tehsil-percentage-progressive', component: TehsilPercentageProgressiveComponent, },
          { path: 'tehsil-percentage-selected-month', component: TehsilPercentageSelectedMonthComponent, },
          { path: 'tehsil-count-current-month', component: TehsilCountCurrentMonthComponent, },
          { path: 'tehsil-count-progressive', component: TehsilCountProgressiveComponent, },
          { path: 'tehsil-count-selected-month', component: TehsilCountSelectedMonthComponent, },
          { path: 'tehsil-count-season',component:TehsilCountSeasonComponent},
          { path: 'tehsil-list-current-month', component: TehsilListCurrentMonthComponent, },
          { path: 'tehsil-list-progressive', component: TehsilListProgressiveComponent, },
          { path: 'tehsil-list-selected-month', component: TehsilListSelectedMonthComponent, },


          { path: 'district-percentage-current-month', component: PercentageComponent, },
          { path: 'district-percentage-progressive', component: DistPercentageProgressiveComponent, },
          { path: 'district-percentage-selected-month', component: DistPercentageSelectedMonthComponent, },
          { path: 'district-count-current-month', component: CountComponent, },
          { path: 'district-count-progressive', component: DistCountProgressiveComponent, },
          { path: 'district-count-selected-month', component: DistCountSelectedMonthComponent, },
          { path: 'district-list-current-month', component: ListComponent, },
          { path: 'district-list-progressive', component: DistListProgressiveComponent, },
          { path: 'district-list-selectedmonth' , component:DistListSelectedMonthComponent},

          { path: 'circlewise-district-count-current', component: CircledistrictwisecountcurrentmonthComponent},
          { path: 'circlewise-district-count-progressive', component: CircledistrcitwisecountprogressiveComponent, },


        ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class IntensityRoutingModule { }
