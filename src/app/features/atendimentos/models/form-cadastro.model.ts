import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

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
      { nonNullable: true, validators: [Validators.required] },);
    this.situacao = new FormControl<number>(
      { value: Situacao.Agendado, disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
    this.valorAtendimento = new FormControl<number>(
      { value: 0, disabled: true },
      { nonNullable: true, validators: [] },);
    this.servicos = new FormArray<FormGroup<Servicos>>(
      [new FormGroup<Servicos>(new Servicos())]);
    this.horario = new FormControl<string>(
      { value: new Date().getHours() + ":00", disabled: false },
      { nonNullable: true, validators: [Validators.required] },);
  }

  public id: FormControl<string | null>;
  public data: FormControl<Date>;
  public cliente: FormControl<ComboItem | null>;
  public situacao: FormControl<number>;
  public valorAtendimento: FormControl<number>;
  public servicos: FormArray<FormGroup<Servicos>>;
  public horario: FormControl<string>;

  public static AddItem(): FormGroup<Servicos> {
    return new FormGroup<Servicos>(new Servicos());
  }
}

class Servicos {
  public constructor() {
    this.servico = new FormControl<ComboItem | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [] },);
    this.valorServico = new FormControl<number | null>(
      { value: null, disabled: false },
      { nonNullable: true, validators: [] },);
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

export interface ComboItem {
  descricao: string;
  valor: string;
}

export const Situacoes: ComboSituacao[] = [
  { descricao: 'Agendado', valor: Situacao.Agendado },
  { descricao: 'Cancelado', valor: Situacao.Cancelado },
  { descricao: 'Concluido', valor: Situacao.Concluido }
];
