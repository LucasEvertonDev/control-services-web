import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { CadastroConstantsService } from './services/cadastro-constants.service';


@NgModule({
  declarations: [
    ConsultaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    CadastroConstantsService
  ]
})
export class ClienteModule { }
