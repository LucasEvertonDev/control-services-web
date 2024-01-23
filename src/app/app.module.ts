import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/theme/module/layout.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingInterceptor } from './core/interceptors/loading.inteceptor';
import { LoadingService } from './shared/services/loading.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    MatDividerModule,
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true  },
    LoadingService,
    MatSnackBar,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
