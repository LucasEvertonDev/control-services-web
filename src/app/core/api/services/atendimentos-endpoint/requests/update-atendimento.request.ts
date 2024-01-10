export interface UpdateAtendimentoRequest {
    data: Date;
    clienteId: string;
    clienteAtrasado?: boolean;
    valorAtendimento: number;
    valorPago?: number;
    observacaoAtendimento?: string;
    situacao: number;
    mapAtendimentosServicos: (MapAtendimentosServicosUpdate)[] | null;
  }
  export interface MapAtendimentosServicosUpdate {
    id: string;
    servicoId: string;
    valorCobrado: number;
  }