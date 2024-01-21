export enum Situacao {
    Ativo = 1,
    Inativo = 2,
}

export interface ComboSituacao {
    descricao: string;
    valor: Situacao;
}

export const Situacoes: ComboSituacao[] = [
    { descricao: 'Ativo', valor: Situacao.Ativo },
    { descricao: 'Inativo', valor: Situacao.Inativo },
];