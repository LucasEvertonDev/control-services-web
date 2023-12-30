import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Situacao } from "./situacoes.model";
import { ClienteResponse } from "src/app/core/api/services/clientes-endpoint/responses/clientes.response";

export class FormCadastroClientes {
    public constructor(clienteModel?: ClienteResponse) {
      this.id = new FormControl<string | null>(
          { value: clienteModel?.id ?? null, disabled: false },
          { nonNullable: true, validators: [] },)
      this.cpf = new FormControl<string>(
          { value: clienteModel?.cpf ??'', disabled: false },
          { nonNullable: true, validators: [validaCampoCpf()] },);
      this.nome = new FormControl<string>(
          { value: clienteModel?.nome ?? '', disabled: false }, 
          { nonNullable: true, validators: [Validators.required, nomeCompostoValidator()] },);
      this.situacao = new FormControl<number>(
          { value: clienteModel?.situacao ?? Situacao.Ativo, disabled: false }, 
          { nonNullable: true, validators: [] },);
      this.dataNascimento = new FormControl<Date | null>(
          { value: clienteModel?.dataNascimento ?? null, disabled: false }, 
          { nonNullable: true, validators: [] },);
      this.telefone = new FormControl<string>(
          { value: clienteModel?.telefone ?? '', disabled: false }, 
          { nonNullable: true, validators: [validaCompoTelefone()] },);
    }

    public id: FormControl<string | null>;
    public cpf: FormControl<string>;
    public nome: FormControl<string>;
    public situacao: FormControl<number>;
    public dataNascimento: FormControl<Date | null>;
    public telefone: FormControl<string>;
}

export function nomeCompostoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nome = control.value;
      
      // Expressão regular para validar nomes compostos (pode ser ajustada conforme necessário)
      const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
  
      // Verifica se o nome atende à expressão regular
      if (nome && !regex.test(nome)) {
        return { 'invalidName': { value: nome } };
      }
  
      // Retorna nulo se a validação passar
      return null;
    };
}

export function validaCampoCpf(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cpf = control.value;
      
      if (!cpf && cpf === '') {
        null;
      }

      if (cpf.length < 14) {
        return { 'cpfInvalido': { value: cpf } };
      }

      return null;
    };
}

export function validaCompoTelefone(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const telefone = control.value;
      
      if (!telefone && telefone === '') {
        null;
      }

      if (telefone.length < 19) {
        return { 'telefoneInvalido': { value: telefone } };
      }
      
      return null;
    };
}