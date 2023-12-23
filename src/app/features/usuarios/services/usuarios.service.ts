import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AppClient } from "src/app/core/api/app-client";
import { ResponseDto } from "src/app/core/api/models/response.model";
import { AuthorizationService } from "src/app/core/services/authorization.services";
import { LoginRequest } from "../models/login.request";
import { LoginResponse } from "../models/login.response";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    public constructor(
        protected appClient: AppClient) {}

    public login(login: LoginRequest): Observable<ResponseDto<LoginResponse>> {
        return this.appClient.HttpPost<LoginResponse>("auth/login", login, {});
    }
}
