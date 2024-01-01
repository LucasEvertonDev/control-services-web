import { Injectable } from '@angular/core';

@Injectable()
export class CadastroConstantsService {
    public NOME_OBRIGATORIO: string = 'Nome é obrigatório';
    public DESCRICAO_OBRIGATORIO: string = 'Descrição é obrigatório';

    public SERVICO_CADASTRADO_SUCESSO: string = 'Serviço cadastrado com sucesso!';
    public SERVICO_ATUALIZADO_SUCESSO: string = 'Serviço atualizado com sucesso!';
}