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
import { ComputeOverviewComponent } from './compute-overview/compute-overview.component';
import { ComputeComponent } from './compute/compute.component';

@NgModule({
  declarations: [
    AppComponent,
    MovingAverageComponent,
    RecentValuesComponent,
    ServerDataComponent,
    ComputeOverviewComponent,
    ComputeComponent
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
