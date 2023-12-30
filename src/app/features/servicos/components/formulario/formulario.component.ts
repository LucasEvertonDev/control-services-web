import { Component } from '@angular/core';
import { AvisoService } from 'src/app/shared/services/snackbar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormCadastroServico } from '../../models/form-cadastro.model';
import { ServicoApiService } from 'src/app/core/api/services/servicos-endpoint/servicos-api.service';
import { CreateServicoRequest } from 'src/app/core/api/services/servicos-endpoint/requests/create-servico.request';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateServicoRequest } from 'src/app/core/api/services/servicos-endpoint/requests/update-servico.request';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  public formCadastro!: FormGroup<FormCadastroServico>;
  public novaEntrada: boolean;

  public constructor(private servicoapiService: ServicoApiService,
    private formBuilder: FormBuilder,
    private actvatedRouter: ActivatedRoute,
    private avisoService: AvisoService,
    private router: Router) {
      this.novaEntrada = !(this.actvatedRouter.snapshot.url[0].path === 'edit');

      if (!this.novaEntrada) {
        this.servicoapiService.getServicoPorId(this.actvatedRouter.snapshot.url[1].path)
          .subscribe((response) => {
            if(response.success) {
              this.formCadastro = this.formBuilder.group<FormCadastroServico>(new FormCadastroServico(response.content));
            }
          });
      }
      else {
        this.formCadastro = this.formBuilder.group<FormCadastroServico>(new FormCadastroServico());
      }
  }

  public onSubmit(): void {
    this.formCadastro.controls.id.value ? this.onUpdate() : this.onCreate();
  }

  public onCreate() : void {
    let createServicoRequest!: CreateServicoRequest;

    createServicoRequest = Object.assign('', createServicoRequest, this.formCadastro.value)
    this.servicoapiService.createServico({
      ...createServicoRequest
    })
    .subscribe((response) =>{
      if(response.success) {
        this.avisoService.ShowSucess("Serviço  cadastrado com sucesso!");
        this.formCadastro.disable();
      }
    });
  }

  public onUpdate(): void {
    let updateServiceRequest!: UpdateServicoRequest;
    
    updateServiceRequest = Object.assign('', updateServiceRequest, this.formCadastro.value)
    this.servicoapiService.updateServico(this.formCadastro.controls.id.value ?? "",{
      ...updateServiceRequest
    })
    .subscribe((response) =>{
      if(response.success) {
        this.avisoService.ShowSucess("Serviço atualizado com sucesso!");
        this.formCadastro.disable();
      }
    });
  }
}
