import { Injectable } from "@angular/core";
import { Situacao } from "../models/form-cadastro.model";

@Injectable()
export class CadastroAtendimentoConstantsService {
    public DATA_AGENDAMENTO_OBRIGATORIA: string = 'Data é obrigatória';
    public HORARIO_AGENDAMENTO_OBRIGATORIO: string = 'Horário é obrigatório';
    public CLIENTE_OBRIGATORIO: string = 'Cliente é obrigatório';
    public SERVICO_OBRIGATORIO: string = 'Serviço é obrigatório';
    public VALOR_SERVICO_OBRIGATORIO: string = 'Valor é obrigatório';
    public SITUACAO_OBRIGATORIO: string = 'Situação é obrigatório';
    public VALOR_PAGO_OBRIGATORIO: string = 'Situação é obrigatório';
    public SITUACAO_CONCLUIDO: Situacao = Situacao.Concluido;


    public SERVICO_CADASTRADO_SUCESSO: string = 'Serviço cadastrado com sucesso!';
    public SERVICO_ATUALIZADO_SUCESSO: string = 'Serviço atualizado com sucesso!';
}