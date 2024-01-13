import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.services';
import { LoadingService } from './shared/services/loading.service';
import { Observable, delay, take } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenModel } from './core/api/structure/token.model';
import { AuthApiService } from './core/api/services/auth-endpoint/auth-api.service';
import { ModalAvisoComponent } from './shared/components/modal-aviso/modal-aviso.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public authorization: boolean = false;
  public loading: boolean = false;

  public constructor(
    private authorizationService: AuthorizationService,
    private authApiService: AuthApiService,
    private idleService: BnNgIdleService,
    private loadingService: LoadingService,
    private router: Router,
    private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.authorizationService.usuarioEstaLogado()
      .subscribe(estaLogado => this.authorization = estaLogado);

    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe(loading =>this.loading = loading);

    this.authorizationService.getToken()
      .subscribe((token: TokenModel) => {
        console.log("Inscrição no token", new Date().toISOString())
        
        if (token && token.refreshTokenInMS && token.refreshTokenInMS > 0) {
          setTimeout(() => {
            this.authApiService.refreshToken().pipe(take(1)).subscribe();
          }, token.refreshTokenInMS);

        }
      });

    this.idleService.startWatching(environment.inative_period_lost_sessiion)
      .subscribe((isUserInactive: boolean) => {
        const currentRoute = this.router.url;

        if (!isUserInactive) {
          return;
        }

        console.log('Session expired...');
 
        if (currentRoute !== '/auth') {
          console.log('Redirecting to login screen...')
          this.authorizationService.logOut();
          this.router.navigateByUrl('/auth');
          this.idleService.resetTimer();
        }
    });
  }
}

