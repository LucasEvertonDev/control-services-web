import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCadastroCusto } from '../../models/form-cadastro.model';
import { CustosApiService } from 'src/app/core/api/services/custos-endpoint/custos-api.service';
import { BaseComponent } from 'src/app/shared/components/base/component-base.component';
import { UpdateCustoRequest } from 'src/app/core/api/services/custos-endpoint/request/update-custo.request';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent extends BaseComponent {
  public formCadastro!: FormGroup<FormCadastroCusto>;

  public constructor(
    protected override inject: Injector,
    private custoApiService: CustosApiService) {
    super(inject);
    if (!this.novaEntrada) {
      this.custoApiService.getCustoPorId(this.actvatedRouter.snapshot.url[1].path)
        .subscribe((response) => {
          if(response.success) {
            this.formCadastro = this.formBuilder.group<FormCadastroCusto>(new FormCadastroCusto(response.content));
          }
        });
    }
    else {
      this.formCadastro = this.formBuilder.group<FormCadastroCusto>(new FormCadastroCusto());
    }
  }

  public onSubmit(): void {
    this.formCadastro.controls.id.value ? this.onUpdate() : this.onCreate();
  }

  public onCreate(): void {
    this.custoApiService.createCusto(
      FormCadastroCusto.getCreateCustoRequest(this.formCadastro))
        .subscribe((response) =>{
          if(response.success) {
            this.avisoService.ShowSucess("Custo cadastrado com sucesso!");
            this.formCadastro.disable();
          }
    });
  }

  public onUpdate(): void {
    this.custoApiService.updateCusto(
      this.formCadastro.value.id ?? '', FormCadastroCusto.getUpdateCustoRequest(this.formCadastro))
    .subscribe((response) =>{
      if(response.success) {
        this.avisoService.ShowSucess('Custo atualizado com sucesso!');
        this.formCadastro.disable();
      }
    });
  }
}
