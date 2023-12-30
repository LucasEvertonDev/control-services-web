import { LoginRequest } from './../../../../core/api/services/auth-endpoint/requests/login.request';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { AuthApiService } from 'src/app/core/api/services/auth-endpoint/auth-api.service';
import { AvisoService } from 'src/app/shared/services/snackbar.service';
import { LoginContantsService } from '../../services/login-contants.service';
import { FormLogin } from '../../models/form-login.model';
import { AuthorizationService } from 'src/app/core/services/authorization.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  public formLogin!: FormGroup<FormLogin>;
  private loginRequest!: LoginRequest;

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AvisoService: AvisoService,
    private authApiService: AuthApiService,
    public LOGIN_CONSTS: LoginContantsService,
    private authorization: AuthorizationService) {
  }
  public async ngOnInit(): Promise<void> {
    if (await this.estaLogado()) {
      this.router.navigateByUrl('dashboard')
    }

    this.formLogin = this.formBuilder.group<FormLogin>(new FormLogin());
  }

  public onSubmit() {
    if (!this.formLogin.valid) {
      this.AvisoService.ShowError("Por favor revise seu formulário!")
      return;
    }

    this.loginRequest = Object.assign('', this.loginRequest, this.formLogin.value)

    this.authApiService.login({ ...this.loginRequest })
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/home'], { state: { prevPage: '/home' } });
        }
      });
  }

  public async estaLogado(): Promise<boolean> {
    return await firstValueFrom(this.authorization.usuarioEstaLogado().pipe(take(1)));
  }
}
