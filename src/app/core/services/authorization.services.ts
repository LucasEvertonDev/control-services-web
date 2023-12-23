import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

    public login() {
        sessionStorage.setItem('token', 'supostoToken');
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
