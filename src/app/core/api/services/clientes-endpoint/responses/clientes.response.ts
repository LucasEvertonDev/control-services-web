export interface ClienteResponse {
    id: string,
    situacao: number,
    cpf: string | null,
    nome: string,
    dataNascimento: Date | null,
    telefone: string | null,
    numeroAtendimentos: number | null
}