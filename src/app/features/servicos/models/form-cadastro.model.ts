import { ServicoResponse } from './../../../core/api/services/servicos-endpoint/responses/servicos.response';
import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Situacao } from './situacoes.model';

export class FormCadastroServico {
    public constructor(servicoResponse?: ServicoResponse) {
        this.id = new FormControl<string | null>(
            { value: servicoResponse?.id ?? null, disabled: false },
            { nonNullable: true, validators: [] },)
        this.nome = new FormControl<string>(
            { value: servicoResponse?.nome ?? '', disabled: false },
            { nonNullable: true, validators: [Validators.required] },);
        this.descricao = new FormControl<string | string>(
            { value: servicoResponse?.descricao ?? '', disabled: false },
            { nonNullable: true, validators: [] },);
        this.situacao = new FormControl<number>(
            { value: Situacao.Ativo, disabled: false },
            { nonNullable: true, validators: [] },);
    }

    public id: FormControl<string | null>;
    public nome: FormControl<string>;
    public descricao: FormControl<string | string>;
    public situacao: FormControl<number>;
}