import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LogoutComponent } from './logout.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrowserModule,
    RouterModule
 
  
  ],
  exports: [
    LogoutComponent
]
})
export class logoutModule { }



