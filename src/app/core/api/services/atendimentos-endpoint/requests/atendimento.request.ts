export interface AtendimentoRequest {
    data: string;
    clienteId: string;
    clienteAtrasado?: boolean;
    valorAtendimento: number;
    valorPago?: number;
    observacaoAtendimento?: string;
    situacao: number;
    mapAtendimentosServicos: (MapAtendimentosServicos)[] | null;
  }
  export interface MapAtendimentosServicos {
    servicoId: string;
    valorCobrado: number;
  }