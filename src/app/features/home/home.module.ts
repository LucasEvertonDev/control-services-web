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
import { GraficoMelhoresClientesComponent } from './components/grafico-melhores-clientes/grafico-melhores-clientes.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    CalendarioComponent, 
    CardComponent,
    GraficoServicosMesComponent,
    GraficoMelhoresClientesComponent
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
    NgbModule,
    NgChartsModule
  ]
})
export class HomeModule { }
