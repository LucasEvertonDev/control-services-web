import { UsuarioService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthorizationService } from 'src/app/core/services/authorization.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizationService: AuthorizationService,
    private usuarioService: UsuarioService
  ) {}

  public ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit() {
    if (this.formLogin.valid) {
      this.usuarioService
        .login({
          email: this.formLogin.value.username,
          senha: this.formLogin.value.password,
        })
        .pipe(take(1))
        .subscribe((response) => {
          if (response.success) {
            this.authorizationService.login(response);
            this.router.navigate(['/home'], { state: { prevPage: '/home' } });
          }
        });
    }
  }
}
