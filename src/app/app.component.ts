import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.services';
import { LoadingService } from './shared/services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public authorization: boolean = false;
  public loading: boolean = false;

  public constructor(private authorizationService: AuthorizationService,
    private loadingService: LoadingService,) {}

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
  }
}
