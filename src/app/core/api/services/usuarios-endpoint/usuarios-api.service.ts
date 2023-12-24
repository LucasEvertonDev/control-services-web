import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { CreateUserRequest } from "../usuarios-endpoint/requests/create-user.request";
import { CreateUserResponse } from "../usuarios-endpoint/responses/create-user.response";
import { DTO } from "../../structure/response.model";

@Injectable({
    providedIn: 'root'
})
export class UsuarioApiService {
    public constructor(
        protected appClient: AppClient) {}

    public createUser(createUserRequest: CreateUserRequest): Observable<DTO<CreateUserResponse>> {
        return this.appClient.HttpPost<CreateUserResponse>("usuarios", createUserRequest, {});
    }
}
