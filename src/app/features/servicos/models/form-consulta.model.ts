import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Situacao } from "./situacoes.model";

export class FormConsultaServico {
    public constructor() {
        this.nome = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [] },);
        this.descricao = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [] },);
        this.situacao = new FormControl<number>(
            { value: Situacao.Ativo, disabled: false },
            { nonNullable: true, validators: [] },);
    }

    public nome: FormControl<string>;
    public descricao: FormControl<string>;
    public situacao: FormControl<number>;
}