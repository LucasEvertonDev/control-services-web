import { ComboSimNao, OpcpesConfirma } from './../../models/form-cadastro.model';
import { BaseComponent, } from '../../../../shared/components/base/component-base.component';
import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboSituacao, FormCadastroAtendimentos, Situacoes } from '../../models/form-cadastro.model';
import { map, startWith, take, takeUntil, tap } from 'rxjs';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { ServicoApiService } from 'src/app/core/api/services/servicos-endpoint/servicos-api.service';
import { ComboItem, ComboItemGroup } from 'src/app/shared/models/combo-item.model';
import { CadastroAtendimentoConstantsService } from '../../services/cadastro-atendimento-constants.service';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent extends BaseComponent {
  public formCadastro: FormGroup<FormCadastroAtendimentos> = new FormGroup<FormCadastroAtendimentos>(new FormCadastroAtendimentos());
  public situacoes: ComboSituacao[] = Situacoes;
  public clientes: ComboItemGroup = new ComboItemGroup();
  public servicos: ComboItemGroup = new ComboItemGroup();
  public opcoesConfirma: ComboSimNao[] = OpcpesConfirma;

  public constructor(
    protected override inject: Injector,
    private clienteApiService: ClientesApiService,
    private servicoApiService: ServicoApiService,
    public CONSTS: CadastroAtendimentoConstantsService,
    private atendimentoApiService: AtendimentoApiService
  ) {
    super(inject);

    if (!this.novaEntrada) {
      this.atendimentoApiService.getAtendimentoPorId(this.actvatedRouter.snapshot.url[1].path)
        .subscribe((response) => {
          if (response.success) {
            this.formCadastro = this.formBuilder.group<FormCadastroAtendimentos>(new FormCadastroAtendimentos(response.content));
            this.formCadastro.controls.servicos.controls.forEach(item => {
              item.controls.valorServico.valueChanges
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((value) => {
                  this.valorTotalAtendimento();
                });
            });
          }
        });
    }
    else {
      this.formCadastro = this.formBuilder.group<FormCadastroAtendimentos>(new FormCadastroAtendimentos());
    }
    this.recuperaClientes();
    this.recuperaServicos();
  }

  public onSubmit(): void {
    this.formCadastro.controls.id.value ? this.onUpdate() : this.onCreate();
  }

  public onCreate() {
    this.atendimentoApiService.createAtendimento(FormCadastroAtendimentos.GetCreateAtendimentoRequest(this.formCadastro))
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.avisoService.ShowSucess(this.CONSTS.ATENDIMENTO_CADASTRADO_SUCESSO);
          this.formCadastro.disable();
        }
      });
  }

  public onUpdate() {
    this.atendimentoApiService.updateAtendimento(
        this.formCadastro.controls.id.value ?? '',
        FormCadastroAtendimentos.GetUpdateAtendimentoRequest(this.formCadastro))
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.avisoService.ShowSucess(this.CONSTS.ATENDIMENTO_ATUALIZADO_SUCESSO);
          this.formCadastro.disable();
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

          this.clientes.itensFiltrados = this.formCadastro.controls.cliente.valueChanges.pipe(
            takeUntil(this.ngUnsubscribe$),
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
          this.servicos.itens = response.content.items.map<ComboItem>(item => {
            return {
              descricao: item.nome,
              valor: item.id
            }
          });

          this.formCadastro.controls.servicos.controls.forEach((item) => {
            this.servicos.itensFiltrados = item.controls.servico.valueChanges.pipe(
              takeUntil(this.ngUnsubscribe$),
              startWith(item.controls.servico.value),
              map(value => this.filtrarServicos(value)),
            );

            item.controls.valorServico.valueChanges
              .pipe(takeUntil(this.ngUnsubscribe$))
              .subscribe((value) => {
                this.valorTotalAtendimento();
              });
          });
        }
      });
  }

  public removeItem(i: number): void {
    if (this.formCadastro.controls.servicos.length !== 1)
      this.formCadastro.controls.servicos.removeAt(i);
  }

  public addItem(): void {
    var item = FormCadastroAtendimentos.AddItem();
    this.servicos.itensFiltrados = item.controls.servico.valueChanges.pipe(
      startWith(item.value.servico?.valor),
      takeUntil(this.ngUnsubscribe$),
      map(value => this.filtrarServicos(value)),
    );

    item.controls.valorServico.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => this.valorTotalAtendimento());

    this.formCadastro.controls.servicos.push(item);
  }

  public valorTotalAtendimento() {
    this.formCadastro.controls.valorAtendimento.setValue(
      this.formCadastro.controls.servicos.controls.reduce((acumulador, elemento) => acumulador + (elemento.controls.valorServico.value ?? 0), 0));
  }

  private filtrarClientes(value: any): ComboItem[] {
    return this.clientes.itens?.filter(option => !value
      || option.descricao?.toLowerCase().startsWith(value?.descricao ? value.descricao?.toLowerCase() : value.toLowerCase()));
  }

  private filtrarServicos(value: any): ComboItem[] {
    return this.servicos?.itens.filter(option => !value
      || option.descricao?.toLowerCase().startsWith(value?.descricao ? value.descricao?.toLowerCase() : value.toLowerCase()));
  }
}
