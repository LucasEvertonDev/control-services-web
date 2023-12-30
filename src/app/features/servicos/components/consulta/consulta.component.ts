import { ServicoResponse } from './../../../../core/api/services/servicos-endpoint/responses/servicos.response';
import { Component } from '@angular/core';
import { PaginationResult } from './../../../../core/api/structure/response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { FormConsultaServico } from '../../models/form-consulta.model';
import { ServicoApiService } from 'src/app/core/api/services/servicos-endpoint/servicos-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {
  public formConsulta: FormGroup<FormConsultaServico>;
  public paginationResult!: PaginationResult<ServicoResponse>;
  public pageEvent!: PageEvent;
  public items!: ServicoResponse[];

  public constructor(private formBuilder: FormBuilder,
    private servicoApiService: ServicoApiService) {
    this.formConsulta = this.formBuilder.group<FormConsultaServico>(new FormConsultaServico());
    
    this.pageEvent = {
      length: 10,
      pageIndex: 0,
      pageSize: 10
    };

    this.getServicos(this.pageEvent);
  }

  public onSubmit() {
    this.getServicos(this.pageEvent);
  }

  public getServicos(event: PageEvent) {
    this.pageEvent = event;
    this.servicoApiService.getServicos(event.pageIndex + 1, event.pageSize, {...this.formConsulta.value})
      .pipe(take(1))
      .subscribe((response) => {
        this.paginationResult = response.content;
        this.items = response.content.items;
      });
  }
}
