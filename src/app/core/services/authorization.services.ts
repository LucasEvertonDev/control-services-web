import { TokenModel } from '../api/models/token.model';
import { LoginResponse } from './../../features/usuarios/models/login.response';
import { ResponseDto } from './../api/models/response.model';
import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { AppClient } from '../api/app-client';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);
    private subjectToken: BehaviorSubject<TokenModel> = new BehaviorSubject({} as TokenModel);
    
    public constructor(private appCliente: AppClient) {}

    public login(response: ResponseDto<LoginResponse>) : void {

        this.translateToken(response);
        sessionStorage.setItem('token', response.content.access_token);
    }

    public logOut(): void {
        sessionStorage.removeItem('token');
        this.subjectLogin.next(false);
    }

    public RefreshToken(): Observable<ResponseDto<LoginResponse>> {
        console.log("atualizei no token", new Date().toISOString());
       
        return this.appCliente.HttpPost<LoginResponse>("auth/refreshtoken", {}, {}).pipe(
            map(response => {
                if (response.success) {
                    this.translateToken(response);

                    sessionStorage.setItem('token', response.content.access_token ?? "");
                    this.subjectLogin.next(true);
                }
                return response;
            }),
        );
    }

    public usuarioEstaLogado(): Observable<any> {
        const token = sessionStorage.getItem('token');

        if (token) {
            this.subjectLogin.next(true);
        }

        return this.subjectLogin.asObservable();
    }

    public getToken(): Observable<any> {
        return this.subjectToken.asObservable();
    }

    private translateToken(response: ResponseDto<LoginResponse>) {
        var token: TokenModel = jwtDecode(response.content.access_token);

        token.expirationFormated = response.content.expire_date;

        token.refreshTokenInMS = (new Date(token.expirationFormated).getTime() - new Date().getTime()) - (3 * 60000); // 3 minutos pra refresh token tempo em milisegundos

        this.subjectToken.next(token);
    }
}
