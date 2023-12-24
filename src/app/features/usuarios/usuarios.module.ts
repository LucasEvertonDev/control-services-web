import { RegistrarComponent } from './components/registrar/registrar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { LoginContantsService } from './services/login-contants.service';
import { RegistarConstantsService } from './services/registrar-constants.service';

@NgModule({
  declarations: [
    RegistrarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    LoginContantsService,
    RegistarConstantsService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
     }
  }
  ]
})
export class UsuariosModule { }
