import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GyDynamicFormModule } from 'gy-dynamic-form';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GyDynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
