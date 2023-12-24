import { RegistarConstantsService } from './../../services/registrar-constants.service';
import { CreateUserRequest } from './../../../../core/api/services/usuarios-endpoint/requests/create-user.request';
import { SnackBarService } from './../../../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/core/api/services/usuarios-endpoint/usuarios-api.service';
import { FormRegistrar } from '../../models/form-registrar.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  public registerForm: FormGroup<FormRegistrar>;
  private createUserRequest!: CreateUserRequest;

  public constructor(private formBuilder: FormBuilder,
    private usuarioApiService: UsuarioApiService,
    private snackBarService: SnackBarService,
    private router: Router,
    public REGISTER_CONSTS: RegistarConstantsService) {
      this.registerForm = this.formBuilder.group<FormRegistrar>(new FormRegistrar(), {
        validators: [FormRegistrar.senhaMatchValidator]
      });
  }

  public onSubmit() {
    this.createUserRequest = Object.assign('', this.createUserRequest, this.registerForm.value)

    this.usuarioApiService
      .createUser({...this.createUserRequest})
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/auth');
          this.snackBarService.ShowSucess(this.REGISTER_CONSTS.USUARIO_CADASTRADO_COM_SUCESSO)
        }
      });
  }
}