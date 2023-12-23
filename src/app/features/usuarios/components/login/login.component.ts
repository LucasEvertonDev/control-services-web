import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;

  public constructor(private fb: FormBuilder,
    private router: Router,
    private authorization: AuthorizationService) { }

  public ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit() {
    if (this.formLogin.valid) {
      console.log('Formulário válido:', this.formLogin.value);
      // Implemente a lógica de autenticação aqui

      this.authorization.login();

      this.router.navigate(['/home/index'], { state: { prevPage: '/home/index' } });
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }
}
