import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class FormRegistrar {
    public constructor() {
        this.nome = new FormControl<string>(
            { value: '', disabled: false }, 
            { nonNullable: true, validators: [Validators.required, Validators.minLength(10), nomeCompostoValidator()] },)
        this.email = new FormControl<string>(
            { value: '', disabled: false },
            { nonNullable: true, validators: [Validators.required] },)
        this.senha = new FormControl<string>({
             value: '', disabled: false },
             { nonNullable: true, validators: [Validators.required] },)
        this.confirmarSenha = new FormControl<string>(
            { value: '', disabled: false }, 
            { nonNullable: true, validators: [Validators.required] },)
    }

    public nome: FormControl<string>;
    public email: FormControl<string>;
    public senha: FormControl<string>;
    public confirmarSenha: FormControl<string>;

    public static senhaMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      control.get('confirmarSenha')?.
        setErrors(control.get('senha')?.value === control.get('confirmarSenha')?.value ? null : { 'mismatch': true })
      return null;
    };
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