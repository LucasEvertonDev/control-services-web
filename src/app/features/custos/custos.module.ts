import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustosRoutingModule } from './custos-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { ConsultaComponent } from './components/consulta/consulta.component';


@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    CustosRoutingModule,
    AngularMaterialModule
  ]
})
export class CustosModule { }
