import { FormControl } from "@angular/forms";
import { ComboItem } from "src/app/shared/models/combo-item.model";

export class FormConsultaAtendimentos {
    public constructor(atentimentoModel?: {}) {
        this.dataInicio = new FormControl<Date | null | any>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
        this.dataFim = new FormControl<Date | null | any>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
        this.cliente = new FormControl<ComboItem | null>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
        this.situacao = new FormControl<number>(
            { value: Situacao.Agendado, disabled: false },
            { nonNullable: true, validators: [] },);
    }

    public dataInicio: FormControl<Date | null | any>;
    public dataFim: FormControl<Date | null | any>;
    public cliente: FormControl<ComboItem | null>;
    public situacao: FormControl<number>;
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

export const Situacoes: ComboSituacao[] = [
    { descricao: 'Agendado', valor: Situacao.Agendado },
    { descricao: 'Cancelado', valor: Situacao.Cancelado },
    { descricao: 'Concluido', valor: Situacao.Concluido }
];