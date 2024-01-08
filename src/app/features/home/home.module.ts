import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FullCalendarModule
  ]
})
export class HomeModule { }
