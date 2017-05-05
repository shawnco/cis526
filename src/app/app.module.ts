import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule, DialogModule } from 'primeng/primeng';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      DialogModule,
      ButtonModule
    ],
  declarations: [ 
      AppComponent,
      DashboardComponent,
      NavbarComponent,
      WidgetComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
