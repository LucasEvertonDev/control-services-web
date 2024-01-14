import { Component, Inject, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/component-base.component';
import { FormConsultaCusto } from '../../models/form-consulta.model';
import { CustosResponse } from 'src/app/core/api/services/custos-endpoint/response/custos.response';
import { PaginationResult } from 'src/app/core/api/structure/response.model';
import { PageEvent } from '@angular/material/paginator';
import { CustosApiService } from 'src/app/core/api/services/custos-endpoint/custos-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent extends BaseComponent {
  public formConsulta: FormGroup<FormConsultaCusto>;
  public paginationResult!: PaginationResult<CustosResponse>;
  public pageEvent!: PageEvent;
  public items!: CustosResponse[];

  public constructor(protected override inject: Injector,
    private custosApiService: CustosApiService) {
    super(inject);
    this.formConsulta = this.formBuilder.group<FormConsultaCusto>(new FormConsultaCusto());

    this.pageEvent = {
      length: 10,
      pageIndex: 0,
      pageSize: 10
    };

    this.getCustos(this.pageEvent);
  }



  public onSubmit() {    
    this.getCustos(this.pageEvent);
  }

  public getCustos(event: PageEvent) {
    this.pageEvent = event;
    this.custosApiService.getCustos(event.pageIndex + 1, event.pageSize, {...this.formConsulta.value})
      .pipe(take(1))
      .subscribe((response) => {
        this.paginationResult = response.content;
        this.items = response.content.items;
      });
  }

}


