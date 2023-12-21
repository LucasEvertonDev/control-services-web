import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup([]);

  constructor(private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10), this.customNameValidator]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.compose([Validators.required])],
    });

    this.registerForm.addValidators(this.passwordMatchValidator());
  }

  ngOnInit(): void {
    
  }

  customNameValidator(control: FormControl) {
    const value: string = control.value || '';
    const isValid = value.split(' ').length > 1;
    return isValid ? null : { invalidName: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulário válido:', this.registerForm.value);
      // Implemente a lógica para enviar os dados ao servidor ou fazer outras operações necessárias
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }

  public passwordMatchValidator(): any {
    return (group: FormGroup): void => {
      const senha = group.get('senha');
      const confirmarSenha = group.get('confirmarSenha');
      confirmarSenha?.setErrors(senha?.value === confirmarSenha?.value ? null : { mismatch: true });
    };
  }
}