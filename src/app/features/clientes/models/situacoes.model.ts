export enum Situacao {
    Ativo = 1,
    Inativo = 2,
}

export interface ComboItem {
    descricao: string;
    valor: Situacao;
}

export const Situacoes: ComboItem[] = [
    { descricao: 'Ativo', valor: Situacao.Ativo },
    { descricao: 'Inativo', valor: Situacao.Inativo },
];