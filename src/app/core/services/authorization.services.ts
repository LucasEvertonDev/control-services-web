import { LoginResponse } from './../../features/usuarios/models/login.response';
import { ResponseDto } from './../api/models/response.model';
import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

    public constructor() {}

    public login(response: ResponseDto<LoginResponse>) : void {
        sessionStorage.setItem('token', response.content.access_token);
    }

    public logOut(): void {
        sessionStorage.removeItem('token');
        this.subjectLogin.next(false);
    }

    public usuarioEstaLogado(): Observable<any> {
        const token = sessionStorage.getItem('token');

        if (token) {
            this.subjectLogin.next(true);
        }

        return this.subjectLogin.asObservable();
    }
}
