import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShipModule} from "./ship/ship.module";
import { ViewMenuComponent } from './shared/components/view-menu/view-menu.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularSvgIconModule} from "angular-svg-icon";
import {NgxSmartModalModule} from "ngx-smart-modal";


@NgModule({
  declarations: [
    AppComponent,
    ViewMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShipModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
