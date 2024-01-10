export interface UpdateAtendimentoRequest {
    data: string;
    clienteId: string;
    clienteAtrasado?: boolean;
    valorAtendimento: number;
    valorPago?: number;
    observacaoAtendimento?: string;
    situacao: number;
    mapAtendimentosServicos: (MapAtendimentosServicosUpdate)[] | null;
  }
  export interface MapAtendimentosServicosUpdate {
    id?: string | null;
    servicoId: string;
    valorCobrado: number;
  }