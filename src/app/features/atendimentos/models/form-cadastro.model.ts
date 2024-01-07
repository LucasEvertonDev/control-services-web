import { AtendimentoRequest, MapAtendimentosServicos } from './../../../core/api/services/atendimentos-endpoint/requests/atendimento.request';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { DateHelper } from 'src/app/core/helpers/date-helper';
import { ComboItem } from "src/app/shared/models/combo-item.model";

export class FormCadastroAtendimentos {
  public constructor(atentimentoModel?: {}) {
    this.id = new FormControl<string | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [] },);
    this.data = new FormControl<Date>(
      { value: new Date(), disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.cliente = new FormControl<ComboItem | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [comboItemRequired()] },);
    this.situacao = new FormControl<number>(
      { value: Situacao.Agendado, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.valorAtendimento = new FormControl<number>(
      { value: 0, disabled: true },
      { nonNullable: true, validators: [] },);
    this.valorPago = new FormControl<number>(
      { value: 0, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.clienteAtrasou = new FormControl<boolean>(
      { value: false, disabled: false },
      { nonNullable: true, validators: [] },);
    this.servicos = new FormArray<FormGroup<Servicos>>(
      [new FormGroup<Servicos>(new Servicos())]);
    this.horario = new FormControl<string>(
      { value: String(new Date().getHours()).padStart(2, '0') + ":00", disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.observacao = new FormControl<string | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [] },);
  }

  public id: FormControl<string | null>;
  public data: FormControl<Date>;
  public cliente: FormControl<ComboItem | null>;
  public situacao: FormControl<number>;
  public valorAtendimento: FormControl<number>;
  public valorPago: FormControl<number>;
  public clienteAtrasou: FormControl<boolean>;
  public servicos: FormArray<FormGroup<Servicos>>;
  public horario: FormControl<string>;
  public observacao: FormControl<string | null>;

  public static AddItem(): FormGroup<Servicos> {
    return new FormGroup<Servicos>(new Servicos());
  }

  public static GetAtemdimentoRequest(formGroup: FormGroup<FormCadastroAtendimentos>): AtendimentoRequest {
    let servicos: MapAtendimentosServicos[] = [];
    let formData = formGroup.getRawValue();

    formData.servicos.forEach(item => {
      servicos.push({
        servicoId: item.servico?.valor ?? '',
        valorCobrado: item.valorServico ?? 0
      });
    });

    return {
      clienteAtrasado: formData.clienteAtrasou ?? false,
      clienteId: formData.cliente?.valor ?? '',
      data: DateHelper.formatDate(formData.data, `yyyy-MM-ddT${formData.horario}:00`, false),
      observacaoAtendimento: formData.observacao ?? '',
      situacao: formData.situacao,
      valorAtendimento: formData.valorAtendimento,
      valorPago: formData.valorPago,
      mapAtendimentosServicos: servicos
    };
  }
}

class Servicos {
  public constructor() {
    this.servico = new FormControl<ComboItem | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [comboItemRequired()] },);
    this.valorServico = new FormControl<number | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
  }

  public servico: FormControl<ComboItem | null>;
  public valorServico: FormControl<number | null>;
}

export enum Situacao {
  Agendado = 0,
  Cancelado = 1,
  Concluido = 2
}

export interface ComboSituacao {
  descricao: string;
  valor: Situacao;
}

export interface ComboSimNao {
  descricao: string;
  valor: boolean;
}

export const Situacoes: ComboSituacao[] = [
  { descricao: 'Agendado', valor: Situacao.Agendado },
  { descricao: 'Cancelado', valor: Situacao.Cancelado },
  { descricao: 'Concluido', valor: Situacao.Concluido }
];

export const OpcpesConfirma: ComboSimNao[] = [
  { descricao: 'Sim', valor: true },
  { descricao: 'Não', valor: false },
];

export function comboItemRequired(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;

    if (!valor || !valor.descricao) {
      return { 'custom-required': { value: valor } };
    }

    return null;
  };
}

