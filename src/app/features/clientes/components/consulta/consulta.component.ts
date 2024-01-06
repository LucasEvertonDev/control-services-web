import { PaginationResult } from './../../../../core/api/structure/response.model';
import { ClientesApiService } from './../../../../core/api/services/clientes-endpoint/clientes-api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConsultarClientes } from '../../models/form-consultar.model';
import { ComboSituacao, Situacoes } from '../../models/situacoes.model';
import { take } from 'rxjs';
import { ClienteResponse } from 'src/app/core/api/services/clientes-endpoint/responses/clientes.response';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {
  public formConsulta: FormGroup<FormConsultarClientes>;
  public situacoes: ComboSituacao[] = Situacoes;
  public paginationResult!: PaginationResult<ClienteResponse>;
  public pageEvent!: PageEvent;
  public items!: ClienteResponse[];

  public constructor(private formBuilder: FormBuilder,
    private clienteApiService: ClientesApiService) {
    this.formConsulta = this.formBuilder.group<FormConsultarClientes>(new FormConsultarClientes());
    
    this.pageEvent = {
      length: 10,
      pageIndex: 0,
      pageSize: 10
    };

    this.getClientes(this.pageEvent);
  }

  public onSubmit() {
    this.getClientes(this.pageEvent);
  }

  public getClientes(event: PageEvent) {
    this.pageEvent = event;
    this.clienteApiService.getClientes(event.pageIndex + 1, event.pageSize, {...this.formConsulta.value})
      .pipe(take(1))
      .subscribe((response) => {
        this.paginationResult = response.content;
        this.items = response.content.items;
      });
  }
}
