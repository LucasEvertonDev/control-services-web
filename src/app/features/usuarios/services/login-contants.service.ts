import { Injectable } from '@angular/core';

@Injectable()
export class LoginContantsService {
    /* Validação de formulário */
    public EMAIL_OBRIGATORIO: string = 'Email é obrigatório';
    public EMAIL_INVALIDO: string = 'Digite um e-mail válido';
    public SENHA_OBRIGATORIA: string = 'Senha é obrigatória';
    public SENHA_MIN_LENGHT: string = 'Senha deve conter no mínimo 8 caracteres';
    public REVISE_SEU_FORMULARIO: string = 'Por favor revise seu formulário';
}