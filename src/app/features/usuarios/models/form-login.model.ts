import { FormControl, FormGroup, Validators } from "@angular/forms";

export class FormLogin {
    public constructor() {
        this.email = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [Validators.required, Validators.email] },)
        this.senha = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] },)
    }

    public email: FormControl<string>;
    public senha: FormControl<string>;
}