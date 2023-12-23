import { SnackBarService } from './../../../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup([]);

  public constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBarService: SnackBarService,
    private router: Router) {

    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10), this.customNameValidator]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.compose([Validators.required])],
    });

    this.registerForm.addValidators(this.passwordMatchValidator());
  }

  public ngOnInit(): void { }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.usuarioService
        .createUser({
          email: this.registerForm.value.email,
          nome: this.registerForm.value.nome,
          senha: this.registerForm.value.senha
        })
        .pipe(take(1))
        .subscribe((response) => {
          if (response.success) {
            this.router.navigateByUrl('/auth');
            this.snackBarService.ShowSucess("Usuário cadastrado com sucesso.")
          }
        });
    }
  }

  private customNameValidator(control: FormControl) {
    const value: string = control.value;
    const isValid = value ? value.split(' ').length > 1 : true;
    return isValid ? null : { invalidName: true };
  }

  private passwordMatchValidator(): any {
    return (group: FormGroup): void => {
      const senha = group.get('senha');
      const confirmarSenha = group.get('confirmarSenha');
      confirmarSenha?.setErrors(senha?.value === confirmarSenha?.value ? null : { mismatch: true });
    };
  }
}