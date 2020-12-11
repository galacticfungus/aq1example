import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovingAverageComponent } from './moving-average/moving-average.component';
import { RecentValuesComponent } from './recent-values/recent-values.component';
import { ServerDataComponent } from './server-data/server-data.component';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDivider, MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    MovingAverageComponent,
    RecentValuesComponent,
    ServerDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
  ],
  exports: [
    MatDividerModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
