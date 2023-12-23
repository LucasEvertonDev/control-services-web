import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.services';
import { LoadingService } from './shared/services/loading.service';
import { Observable, delay, take } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenModel } from './core/api/models/token.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public authorization: boolean = false;
  public loading: boolean = false;

  public constructor(private authorizationService: AuthorizationService,
    private idleService: BnNgIdleService,
    private loadingService: LoadingService,
    private router: Router) { }

  public ngOnInit(): void {
    this.authorizationService.usuarioEstaLogado()
      .subscribe((estaLogado) => {
        this.authorization = estaLogado
      });

    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });

    this.authorizationService.getToken()
      .subscribe((token: TokenModel) => {
        console.log("Inscrevi no token", new Date().toISOString())
        if (token && token.refreshTokenInMS && token.refreshTokenInMS > 0) {
          setTimeout(() => {
            this.authorizationService.RefreshToken().pipe(take(1)).subscribe();
          }, token.refreshTokenInMS);
        }
      });

    this.idleService.startWatching(environment.inative_period_lost_sessiion).subscribe((isUserInactive: boolean) => {
      if (isUserInactive) {
        console.log('Session expired...');
        const currentRoute = this.router.url;
        if (currentRoute !== '/login') {
          console.log('Redirecting to login screen...')
          this.authorizationService.logOut();
          this.router.navigateByUrl('/auth');
          this.idleService.resetTimer();
        }
      }
    });
  }
}

