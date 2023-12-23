import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true  },
    LoadingService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
