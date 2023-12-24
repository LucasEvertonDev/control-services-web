import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormCadastroClientes } from '../../models/form-cadastro.model';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboItem, Situacoes } from '../../models/situacoes.model';
import { CadastroConstantsService } from '../../services/cadastro-constants.service';
import { CreateClienteRequest } from 'src/app/core/api/services/clientes-endpoint/requests/create-cliente.request';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  public formCadastro!: FormGroup<FormCadastroClientes>;
  public novaEntrada: boolean;
  public situacoes: ComboItem[] = Situacoes;
  public createClienteRequest!: CreateClienteRequest;

  public constructor(private clienteApiService: ClientesApiService,
    private formBuilder: FormBuilder,
    private actvatedRouter: ActivatedRoute,
    public CADASTRO_CONTS: CadastroConstantsService,
    private snackBarService: SnackBarService,
    private router: Router) {
      this.novaEntrada = !(this.actvatedRouter.snapshot.url[0].path === 'edit');
      
      this.formCadastro = this.formBuilder.group<FormCadastroClientes>(new FormCadastroClientes());

      if (!this.novaEntrada) {
        this.formCadastro.controls.id.setValue(this.actvatedRouter.snapshot.url[1].path);
      }
  }

  public onSubmit(): void {
    this.createClienteRequest = Object.assign('', this.createClienteRequest, this.formCadastro.value)
    this.clienteApiService.createCliente({
      ...this.createClienteRequest
    })
    .subscribe((response) =>{
      if(response.success) {
        this.snackBarService.ShowSucess(this.CADASTRO_CONTS.CLIENTE_CADASTRADO_SUCESSO);

        this.router.navigateByUrl('/clientes')
      }
    });
  }
}
