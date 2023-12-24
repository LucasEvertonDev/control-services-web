import { Injectable } from '@angular/core';

@Injectable()
export class RegistarConstantsService {
    /* Validação de formulário */
    public NOME_OBRIGATORIO: string = 'Nome é obrigatório.';
    public NOME_MIN_LENGHT: string = 'Nome deve ter 10 caracteres.';
    public NOME_COMPOSTO: string = 'Nome deve ser composto';
    public EMAIL_OBRIGATORIO: string = 'Email é obrigatório';
    public EMAIL_INVALIDO: string = 'Digite um e-mail válido';
    public SENHA_OBRIGATORIA: string = 'Senha é obrigatória';
    public SENHA_MIN_LENGHT: string = 'Senha deve conter no mínimo 8 caracteres';
    public REVISE_SEU_FORMULARIO: string = 'Por favor revise seu formulário';
    public SENHAS_NAO_CONFEREM: string = 'As senhas não conferem';
    public CONFIRMAR_SENHA_OBRIGATORIO: string = 'Confirmar senha é obrigatório';
    public USUARIO_CADASTRADO_COM_SUCESSO: string = 'Usuário cadastrado com sucesso';
}