import { LoginRequest } from './../../../../core/api/services/auth-endpoint/requests/login.request';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthApiService } from 'src/app/core/api/services/auth-endpoint/auth-api.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { LoginContantsService } from '../../services/login-contants.service';
import { FormLogin } from '../../models/form-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public formLogin!: FormGroup<FormLogin>;
  private loginRequest!: LoginRequest;

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService,
    private authApiService: AuthApiService,
    public LOGIN_CONSTS: LoginContantsService) {
      this.formLogin = this.formBuilder.group<FormLogin>(new FormLogin());
  }

  public onSubmit() {
    if (!this.formLogin.valid) {
      this.snackBarService.ShowError("Por favor revise seu formulário!")
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
}
