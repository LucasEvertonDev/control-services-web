export interface AtendimentoResponse {
    id: string
    data: string
    clienteAtrasado: boolean
    valorAtendimento: number
    valorPago: number
    observacaoAtendimento: string
    situacao: number
    cliente: Cliente
    mapAtendimentosServicos: MapAtendimentosServico[]
  }
  
  export interface Cliente {
    id: string
    cpf: string
    nome: string
    dataNascimento: string
    telefone: string
    situacao: number
  }
  
  export interface MapAtendimentosServico {
    id: string
    valor: number
    servico: Servico
  }
  
  export interface Servico {
    id: string
    nome: string
    descricao: string
  }
  