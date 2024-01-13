import { Component, Injector, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboSituacao, FormConsultaAtendimentos, Situacoes } from '../../models/form-consulta.model';
import { ClienteResponse } from 'src/app/core/api/services/clientes-endpoint/responses/clientes.response';
import { PaginationResult } from 'src/app/core/api/structure/response.model';
import { PageEvent } from '@angular/material/paginator';
import { BaseComponent } from 'src/app/shared/components/base/component-base.component';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ComboItem, ComboItemGroup } from 'src/app/shared/models/combo-item.model';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { map, startWith, take, takeUntil } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { AtendimentoResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/atendimento.response';
import { DateHelper } from 'src/app/core/helpers/date-helper';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent extends BaseComponent {
  public formConsulta: FormGroup<FormConsultaAtendimentos>;
  public clientes: ComboItemGroup = new ComboItemGroup();
  public situacoes: ComboSituacao[] = Situacoes;
  public paginationResult!: PaginationResult<AtendimentoResponse>;
  public pageEvent!: PageEvent;
  public items!: AtendimentoResponse[];

  public constructor(
    protected override inject: Injector,
    private clienteApiService: ClientesApiService,
    private atendimentoApiService: AtendimentoApiService
  ) {
    super(inject);
    this.formConsulta = this.formBuilder.group<FormConsultaAtendimentos>(new FormConsultaAtendimentos());
    
    this.recuperaClientes();

    this.pageEvent = {
      length: 10,
      pageIndex: 0,
      pageSize: 10
    };

    this.getAtendimentos(this.pageEvent);
  }

  public onSubmit() {
    this.getAtendimentos(this.pageEvent);
  }

  public getAtendimentos(event: PageEvent) {
    let formData = this.formConsulta.getRawValue();
    this.pageEvent = event;
    this.atendimentoApiService.getAtendimentos(event.pageIndex + 1, event.pageSize, {
      datainicial: formData.dataInicio ? DateHelper.formatDate(formData.dataInicio.toDate(), "yyyy-MM-dd", false) : null,
      datafinal: formData.dataFim ? DateHelper.formatDate(formData.dataFim.toDate(),  "yyyy-MM-dd", false) : null,
      clienteid: formData.cliente?.valor
    })
      .pipe(take(1))
      .subscribe((response) => {
        if(response) {
          this.paginationResult = response.content;
          this.items = response.content.items;
        }
      });
  }

  public recuperaClientes() {
    this.clienteApiService.getClientes(1, 1000, {}).pipe(take(1))
      .subscribe(response => {
        if (response.success) {
          this.clientes.itens = response.content.items.map<ComboItem>(item => {
            return {
              descricao: item.nome,
              valor: item.id
            }
          });

          this.clientes.itensFiltrados = this.formConsulta.controls.cliente.valueChanges.pipe(
            takeUntil(this.ngUnsubscribe$),
            startWith(this.formConsulta.controls.cliente.value),
            map(value => this.filtrarClientes(value)),
          );
        }
      });
  }

  private filtrarClientes(value: any): ComboItem[] {
    return this.clientes.itens?.filter(option => !value
      || option.descricao?.toLowerCase().startsWith(value?.descricao ? value.descricao?.toLowerCase() : value.toLowerCase()));
  }
}
