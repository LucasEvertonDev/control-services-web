import { Router } from '@angular/router';
import { TokenModel } from '../api/structure/token.model';
import { LoginResponse } from '../api/services/auth-endpoint/responses/login.response';
import { DTO } from '../api/structure/response.model';
import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { AppClient } from '../api/app-client';
import { RefreshTokenResponse } from '../api/services/auth-endpoint/responses/refreshtoken.response';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);
    private subjectToken: BehaviorSubject<TokenModel> = new BehaviorSubject({} as TokenModel);
    
    public constructor(private router: Router) {}

    public login(response: DTO<LoginResponse>) : void {
        if (response && response.success) {
            this.translateToken(response);
            sessionStorage.setItem('token', response.content.access_token);
        }
    }

    public logOut(): void {
        sessionStorage.removeItem('token');
        this.subjectLogin.next(false);
    }

    public refreshToken(response: DTO<RefreshTokenResponse>) {
        console.log("Atualiza o token", new Date().toISOString());
        if (response.success) {
            this.translateToken(response);
            sessionStorage.setItem('token', response.content.access_token ?? "");
            this.subjectLogin.next(true);
        }
    }

    public usuarioEstaLogado(): Observable<any> {
        const token = sessionStorage.getItem('token');

        if (token) {
            this.subjectLogin.next(true);
        }

        return this.subjectLogin.asObservable();
    }

    public usuarioEstaLogadoRedirect(): boolean {
        var token = sessionStorage.getItem('token');
        
        if (!token) {
            this.router.navigate(["/auth"]);
            return false;
        }

        return true;
    } 

    public getToken(): Observable<any> {
        return this.subjectToken.asObservable();
    }

    private translateToken(response: DTO<LoginResponse>) {
        var token: TokenModel = jwtDecode(response.content.access_token);

        token.expirationFormated = response.content.expire_date;

        token.refreshTokenInMS = (new Date(token.expirationFormated).getTime() - new Date().getTime()) - (3 * 60000); // 3 minutos pra refresh token tempo em milisegundos

        this.subjectToken.next(token);
    }
}
