export interface UpdateServicoRequest {
    cpf: string | null,
    nome: string,
    dataNascimento: Date | null,
    telefone: string | null
}