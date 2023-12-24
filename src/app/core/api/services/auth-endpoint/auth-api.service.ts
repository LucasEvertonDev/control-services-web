import { AuthorizationService } from 'src/app/core/services/authorization.services';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { LoginRequest } from "./requests/login.request";
import { Observable, map, tap } from "rxjs";
import { DTO } from "../../structure/response.model";
import { LoginResponse } from "./responses/login.response";
import { RefreshTokenResponse } from "./responses/refreshtoken.response";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    public constructor(
        protected appClient: AppClient,
        protected authorizationService: AuthorizationService ) {}

    public login(login: LoginRequest): Observable<DTO<LoginResponse>> {
        return this.appClient.HttpPost<LoginResponse>("auth/login", login, {})
            .pipe(
                tap(response => this.authorizationService.login(response))
            );
    }

    public refreshToken():  Observable<DTO<RefreshTokenResponse>> {
        return this.appClient.HttpPost<RefreshTokenResponse>("auth/refreshtoken", {}, {})
            .pipe(
                tap(response => this.authorizationService.refreshToken(response))
            );
    }
}
