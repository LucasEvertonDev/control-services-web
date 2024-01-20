import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardComponent } from './components/card/card.component';
import { GraficoServicosMesComponent } from './components/grafico-servicos-mes/grafico-servicos-mes.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarioComponent, 
    CardComponent,
    GraficoServicosMesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FullCalendarModule,
    NgbPopoverModule,
    NgxSkeletonLoaderModule,
    NgbModule
  ]
})
export class HomeModule { }
