import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";


export class FormConsultaCusto {
    public constructor() {
        this.dataInicio = new FormControl<Date | null | any>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
        this.dataFim = new FormControl<Date | null | any>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
        this.descricao = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [] },);
        this.valor = new FormControl<number | null>(
            { value: null, disabled: false },
            { nonNullable: true, validators: [] },);
      
    }

    public dataInicio: FormControl<Date | null | any>;
    public dataFim: FormControl<Date | null | any>;
    public descricao: FormControl<string>;
    public valor: FormControl<number| null> ;
    
}