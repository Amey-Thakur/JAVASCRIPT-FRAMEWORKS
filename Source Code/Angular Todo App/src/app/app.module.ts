/**
 * ================================================================================
 * FILE: app.module.ts
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * The central module coordinator for the Angular implementation. This 
 * NgModule orchestrates the dependency injection hierarchy and 
 * provides the foundational library imports (BrowserModule, FormsModule) 
 * required for the application's runtime operation.
 * ================================================================================
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
