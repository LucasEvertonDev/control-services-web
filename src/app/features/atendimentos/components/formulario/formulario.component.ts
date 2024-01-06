import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComboItem, ComboSituacao, FormCadastroAtendimentos, Situacoes } from '../../models/form-cadastro.model';
import { AvisoService } from 'src/app/shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, startWith, take, tap } from 'rxjs';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { ServicoApiService } from 'src/app/core/api/services/servicos-endpoint/servicos-api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  public formCadastro!: FormGroup<FormCadastroAtendimentos>;
  public novaEntrada: boolean;
  public situacoes: ComboSituacao[] = Situacoes;
  public clientes!: ComboItem[];
  public servicos!: ComboItem[];
  public clientesFiltrados!: Observable<ComboItem[]>;
  public servicosFiltrados!: Observable<ComboItem[]>;

  public constructor(
    private formBuilder: FormBuilder,
    private actvatedRouter: ActivatedRoute,
    private AvisoService: AvisoService,
    private router: Router,
    private clienteApiService: ClientesApiService,
    private servicoApiService: ServicoApiService
  ) {
    this.novaEntrada = !(this.actvatedRouter.snapshot.url[0].path === 'edit');
    if (!this.novaEntrada) {

    }
    else {
      this.formCadastro = this.formBuilder.group<FormCadastroAtendimentos>(new FormCadastroAtendimentos());
    }
    this.recuperaClientes();
    this.recuperaServicos();
  }

  public onSubmit() {
    alert(JSON.stringify(this.formCadastro.getRawValue()));
  }

  public recuperaClientes() {
    this.clienteApiService.getClientes(1, 1000, {}).pipe(take(1))
      .subscribe(response => {
        if (response.success) {
          this.clientes = response.content.items.map<ComboItem>(item => {
            return {
              descricao: item.nome,
              valor: item.id
            }
          });

          this.clientesFiltrados = this.formCadastro.controls.cliente.valueChanges.pipe(
            startWith(this.formCadastro.controls.cliente.value),
            map(value => this.filtrarClientes(value)),
          );
        }
      });
  }

  public recuperaServicos() {
    this.servicoApiService.getServicos(1, 1000, {}).pipe(take(1))
      .subscribe(response => {
        if (response.success) {
          this.servicos = response.content.items.map<ComboItem>(item => {
            return {
              descricao: item.nome,
              valor: item.id
            }
          });

          this.formCadastro.controls.servicos.controls.forEach((item) => {
            this.servicosFiltrados = item.controls.servico.valueChanges.pipe(
              startWith(item.controls.servico.value),
              map(value => this.filtrarServicos(value)),
            );

            item.controls.valorServico.valueChanges.subscribe((value) => {
              this.valorTotalAtendimento();
            });
          });
        }
      });
  }

  private filtrarClientes(value: any): ComboItem[] {
    return this.clientes?.filter(option => !value
      || option.descricao?.toLowerCase().startsWith(value?.descricao ? value.descricao?.toLowerCase() : value.toLowerCase()));
  }

  private filtrarServicos(value: any): ComboItem[] {
    return this.servicos?.filter(option => !value
      || option.descricao?.toLowerCase().startsWith(value?.descricao ? value.descricao?.toLowerCase() : value.toLowerCase()));
  }

  public exibiDescricaoItem(opcao: any): string {
    return opcao ? opcao.descricao : '';
  }

  public removeItem(i: number): void {
    if (i !== 0)
      this.formCadastro.controls.servicos.removeAt(i);
  }

  public valorTotalAtendimento() {
    this.formCadastro.controls.valorAtendimento.setValue(
      this.formCadastro.controls.servicos.controls.reduce((acumulador, elemento) => acumulador + (elemento.controls.valorServico.value ?? 0), 0));
  }

  public addItem(): void {
    var item = FormCadastroAtendimentos.AddItem();
    this.servicosFiltrados = item.controls.servico.valueChanges.pipe(
      startWith(this.formCadastro.controls.cliente.value),
      map(value => this.filtrarServicos(value)),
    );

    item.controls.valorServico.valueChanges.subscribe((value) => this.valorTotalAtendimento());

    this.formCadastro.controls.servicos.push(item);
  }
}
