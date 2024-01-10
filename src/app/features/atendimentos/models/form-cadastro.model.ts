import { CreateAtendimentoRequest, MapAtendimentosServicos } from '../../../core/api/services/atendimentos-endpoint/requests/create-atendimento.request';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { DateHelper } from 'src/app/core/helpers/date-helper';
import { ComboItem } from "src/app/shared/models/combo-item.model";
import * as moment from 'moment';
import { AtendimentoResponse, MapAtendimentosServicoResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/atendimento.response';
import { MapAtendimentosServicosUpdate, UpdateAtendimentoRequest } from 'src/app/core/api/services/atendimentos-endpoint/requests/update-atendimento.request';

export class FormCadastroAtendimentos {
  public constructor(atend?: AtendimentoResponse) {
    this.id = new FormControl<string | null>(
      { value: atend?.id ?? null, disabled: false },
      { nonNullable: true, validators: [] },);
    this.data = new FormControl<Date | null | any>(
      { value: atend?.data ? moment(atend.data) : moment(new Date()), disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.cliente = new FormControl<ComboItem | null>(
      { value: FormCadastroAtendimentos.getCliente(atend), disabled: false },
      { nonNullable: true, validators: [comboItemRequired()] },);
    this.situacao = new FormControl<number>(
      { value: atend?.situacao ?? Situacao.Agendado, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.valorAtendimento = new FormControl<number>(
      { value: atend?.valorAtendimento ?? 0, disabled: true },
      { nonNullable: true, validators: [] },);
    this.valorPago = new FormControl<number>(
      { value: atend?.valorPago ?? 0, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.clienteAtrasou = new FormControl<boolean>(
      { value: atend?.clienteAtrasado ?? false, disabled: false },
      { nonNullable: true, validators: [] },);
    this.servicos = new FormArray<FormGroup<FormGroupServicos>>(FormCadastroAtendimentos.getServicos(atend));
    this.horario = new FormControl<string>(
      { value: FormCadastroAtendimentos.getHorario(atend?.data), disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.observacao = new FormControl<string | null>(
      { value: atend?.observacaoAtendimento ?? null, disabled: false },
      { nonNullable: true, validators: [] },);
  }

  public id: FormControl<string | null>;
  public data: FormControl<Date | null | any>;
  public cliente: FormControl<ComboItem | null>;
  public situacao: FormControl<number>;
  public valorAtendimento: FormControl<number>;
  public valorPago: FormControl<number>;
  public clienteAtrasou: FormControl<boolean>;
  public servicos: FormArray<FormGroup<FormGroupServicos>>;
  public horario: FormControl<string>;
  public observacao: FormControl<string | null>;

  public static AddItem(): FormGroup<FormGroupServicos> {
    return new FormGroup<FormGroupServicos>(new FormGroupServicos());
  }

  public static GetCreateAtendimentoRequest(formGroup: FormGroup<FormCadastroAtendimentos>): CreateAtendimentoRequest {
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
      data: DateHelper.formatDate(formData.data.toDate(), `yyyy-MM-ddT${formData.horario}:00`, false),
      observacaoAtendimento: formData.observacao ?? '',
      situacao: formData.situacao,
      valorAtendimento: formData.valorAtendimento,
      valorPago: formData.valorPago,
      mapAtendimentosServicos: servicos
    };
  }

  public static GetUpdateAtendimentoRequest(formGroup: FormGroup<FormCadastroAtendimentos>): UpdateAtendimentoRequest {
    let servicos: MapAtendimentosServicosUpdate[] = [];
    let formData = formGroup.getRawValue();

    formData.servicos.forEach(item => {
      servicos.push({
        servicoId: item.servico?.valor ?? '',
        valorCobrado: item.valorServico ?? 0,
        id: item.id ?? null
      });
    });

    return {
      clienteAtrasado: formData.clienteAtrasou ?? false,
      clienteId: formData.cliente?.valor ?? '',
      data: DateHelper.formatDate(formData.data.toDate(), `yyyy-MM-ddT${formData.horario.trim()}:00`, false),
      observacaoAtendimento: formData.observacao ?? '',
      situacao: formData.situacao,
      valorAtendimento: formData.valorAtendimento,
      valorPago: formData.valorPago,
      mapAtendimentosServicos: servicos
    };
  }

  private static getCliente(atendimento?: AtendimentoResponse | null): ComboItem | null {
    if(!atendimento)
      return null;

    return {
      descricao: atendimento.cliente.nome,
      valor: atendimento.cliente.id
    }
  }

  private static getServicos(atendimento?: AtendimentoResponse | null): FormGroup<FormGroupServicos>[] {
    if(!atendimento)
      return [new FormGroup<FormGroupServicos>(new FormGroupServicos())];

    return atendimento.mapAtendimentosServicos.map<FormGroup<FormGroupServicos>>((map => {
      return new FormGroup<FormGroupServicos>(new FormGroupServicos(map));
    }));
  }

  private static getHorario(date?: string): string {
    if(!date) {
      return String(new Date().getHours()).padStart(2, '0') + ":00";
    }

    return  date.substring(11, 16).padEnd(10);
  }
} 

class FormGroupServicos {
  public constructor(map?: MapAtendimentosServicoResponse) {
    this.id = new FormControl<string | null>(
      { value: map?.id ?? null, disabled: false },
      { nonNullable: true, validators: [] },);
    this.servico = new FormControl<ComboItem | null>(
      { value: FormGroupServicos.getServico(map), disabled: false },
      { nonNullable: true, validators: [comboItemRequired()] },);
    this.valorServico = new FormControl<number | null>(
      { value: map?.valor ?? null, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
  }

  public id: FormControl<string | null>;
  public servico: FormControl<ComboItem | null>;
  public valorServico: FormControl<number | null>;

  private static getServico(map?: MapAtendimentosServicoResponse): ComboItem | null {
    if(!map)
      return null;

    return {
      descricao: map.servico.nome,
      valor: map.servico.id
    };
  }
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

