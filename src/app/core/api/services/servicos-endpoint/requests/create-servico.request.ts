export interface CreateServicoRequest {
    cpf: string | null,
    nome: string,
    dataNascimento: Date | null,
    telefone: string | null,
    situacao: number
}