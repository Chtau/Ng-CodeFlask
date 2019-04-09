import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgCodeflaskModule } from 'projects/ng-codeflask/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCodeflaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
