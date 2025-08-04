import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SideNavigationComponent } from './side-navigation.component';
import {RouterModule} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@NgModule({
  declarations: [
    SideNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrowserModule,
    RouterModule


  ],
  exports: [
    SideNavigationComponent
]
})
export class sidenavigationModule { }



