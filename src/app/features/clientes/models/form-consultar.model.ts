import { FormControl } from "@angular/forms";
import { Situacao } from "./situacoes.model";

export class FormConsultarClientes {
    public constructor() {
      this.cpf = new FormControl<string>(
          { value: '', disabled: false },
          { nonNullable: true, validators: [] },);
      this.nome = new FormControl<string>(
          { value: '', disabled: false }, 
          { nonNullable: true, validators: [] },);
      this.situacao = new FormControl<number>(
          { value: Situacao.Ativo, disabled: false }, 
          { nonNullable: true, validators: [] },);
    }

    public cpf: FormControl<string>;
    public nome: FormControl<string>;
    public situacao: FormControl<number>;
}