export interface AtendimentoResponse {
    id: string
    data: string
    clienteAtrasado: boolean
    valorAtendimento: number
    valorPago: number
    observacaoAtendimento: string
    situacao: number
    cliente: Cliente
    mapAtendimentosServicos: MapAtendimentosServicoResponse[],
    emDebito: boolean,
    agendamentoPendenteAtualizacao: boolean,
    dataFim: string
  }
  
  export interface Cliente {
    id: string
    cpf: string
    nome: string
    dataNascimento: string
    telefone: string
    situacao: number
  }
  
  export interface MapAtendimentosServicoResponse {
    id: string
    valor: number
    servico: Servico
  }
  
  export interface Servico {
    id: string
    nome: string
    descricao: string
  }
  