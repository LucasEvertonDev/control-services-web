import { Inject, Injectable, Injector, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.services';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthGuard).canActivate();
};

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  public constructor(
    protected readonly authSerice: AuthorizationService,
    protected readonly router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authSerice.usuarioEstaLogado()
      .pipe(
        tap((estaLogado) => {
          if (!estaLogado) {
            this.router.navigate(['/auth']);
            return false;
          } else {
            return true;
          }
        })
      )
  }
}