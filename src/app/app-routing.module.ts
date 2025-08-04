import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CurrentDataComponent } from './components/CurrentData/current-data/current-data.component';
import { RainfallReportComponent } from './rainfall-report/rainfall-report.component';
import { DataPacketCountComponent } from './data-packet-count/data-packet-count.component';
import { DailyReportsComponent } from './components/daily-reports/daily-reports.component';
import { ClaimpayoutComponent } from './components/claimpayout/claimpayout.component';
import { CroppopComponent } from './components/croppop/croppop.component';
import { CropadvisoryComponent } from './components/cropadvisory/cropadvisory.component';
import { NonfunctionalawsComponent } from './components/nonfunctionalaws/nonfunctionalaws.component';
import { WeeklyreportsComponent } from './components/weeklyreports/weeklyreports.component';
import { DailyrainreportsComponent } from './components/dailyrainreports/dailyrainreports.component';
import { TemperatureReportsComponent } from './temperature-reports/temperature-reports.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'rainfall-report',
    component:RainfallReportComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
     path:'current-Data',
     component:CurrentDataComponent
  },
  {
    path:'data-packet-count',
    component:DataPacketCountComponent
  },
  {
    path:'daily-reports',
    component:DailyReportsComponent
  },
  {
    path:'claim-payout',
    component:ClaimpayoutComponent
  },
  {
    path:'claim-payout',
    component:ClaimpayoutComponent
  },
  {
    path:'crop-pop',
    component:CroppopComponent
  },
  {
    path:'crop-advisory',
    component:CropadvisoryComponent
  },
  {
    path:'non-functional-aws',
    component:NonfunctionalawsComponent
  },
  {
    path:'weekly-reports',
    component:WeeklyreportsComponent
  },
  {
    path:'daily-rain-reports',
    component:DailyrainreportsComponent
  },
  {
     path:'temperature-reports',
     component:TemperatureReportsComponent
  },
  {
    path: 'Intensity',
    loadChildren: () =>
      import('./components/Intensity/Intensity.module').then(
        (m) => m.IntensityModule
      ),
  },

  {
    path: 'Past-year-queries',
    loadChildren: () =>
      import('./components/Past-year-queries/past-year-queries.module').then(
        (m) => m.pastyearqueriesModule
      ),
  },

  {
    path: 'reports',
    loadChildren: () =>
      import('./components/reports/reports.module').then(
        (m) => m.reportsModule
      ),
  },

  {
    path: 'current_year_queries',
    loadChildren: () =>
      import('./components/current_year_queries/current_year.module').then(
        (m) => m.current_yearModule
      ),
  },

  {
    path: 'Past_year_Intensity',
    loadChildren: () =>
      import('./components/Past-year-intensity/past-year-intensity.module').then(
        (m) => m.PastYearIntensityModule
      ),
  },

  {
    path: 'Maps',
    loadChildren: () =>
      import('./components/maps/maps-routing.module').then(
        (m) => m.MapsRoutingModule
      ),
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
