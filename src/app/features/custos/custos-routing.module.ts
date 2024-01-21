import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [{
  path: '',
  component: ConsultaComponent,
},{
  path: 'create',
  component: FormularioComponent,
},
{
  path: 'edit/:id',
  component: FormularioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustosRoutingModule { }
