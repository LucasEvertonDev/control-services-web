import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConsultarClientes } from '../../models/form-consultar.model';
import { ComboItem, Situacoes } from '../../models/situacoes.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {
  public formConsulta: FormGroup<FormConsultarClientes>;
  public situacoes: ComboItem[] = Situacoes;

  public constructor(private formBuilder: FormBuilder) {
    this.formConsulta = this.formBuilder.group<FormConsultarClientes>(new FormConsultarClientes());
  }

  public onSubmit() {

  }
}
