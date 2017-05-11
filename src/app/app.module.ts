import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule, DialogModule, RatingModule, CalendarModule } from 'primeng/primeng';
import { SimpleNotificationsModule } from 'angular2-notifications-lite';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskComponent } from './task/task.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      DialogModule,
      ButtonModule,
      RatingModule,
      CalendarModule,
      SimpleNotificationsModule.forRoot()
    ],
  declarations: [ 
      AppComponent,
      DashboardComponent,
      NavbarComponent,
      TaskComponent,
      WidgetComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
