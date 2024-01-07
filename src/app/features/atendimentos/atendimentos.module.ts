import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendimentosRoutingModule } from './atendimentos-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CadastroAtendimentoConstantsService } from './services/cadastro-atendimento-constants.service';


@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    AtendimentosRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    CadastroAtendimentoConstantsService
  ]
})
export class AtendimentosModule { }
