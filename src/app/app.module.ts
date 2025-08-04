import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sidenavigationModule } from './components/side-navigation/side-navigation.module';
import { IntensityModule } from './components/Intensity/Intensity.module';
import { pastyearqueriesModule } from './components/Past-year-queries/past-year-queries.module';
import { reportsModule } from './components/reports/reports.module';
import { LoginComponent } from './components/login/login.component';
import { logoutModule } from './logout/logout.module';
import { HeaderComponent } from './components/header/header.component';
import { LoaderInterceptorService } from './service/loader/loader-interceptor.service';
import { BlockUIModule } from 'ng-block-ui';
import { MapsModule } from './components/maps/maps.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    CurrentDataComponent,
    RainfallReportComponent,
    DataPacketCountComponent,
    DailyReportsComponent,
    ClaimpayoutComponent,
    CroppopComponent,
    CropadvisoryComponent,
    NonfunctionalawsComponent,
    WeeklyreportsComponent,
    DailyrainreportsComponent,
    TemperatureReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    logoutModule,
    sidenavigationModule,
    IntensityModule,
    pastyearqueriesModule,
    reportsModule,
    MapsModule,
    BlockUIModule.forRoot()
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
