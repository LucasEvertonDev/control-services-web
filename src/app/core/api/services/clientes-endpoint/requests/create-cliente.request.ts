export interface CreateClienteRequest {
    cpf: string | null,
    nome: string,
    dataNascimento: Date | null,
    telefone: string | null
}