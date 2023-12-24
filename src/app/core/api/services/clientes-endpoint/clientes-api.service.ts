import { PaginationResult } from './../../structure/response.model';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { CreateUserRequest } from "../usuarios-endpoint/requests/create-user.request";
import { CreateUserResponse } from "../usuarios-endpoint/responses/create-user.response";
import { DTO } from "../../structure/response.model";
import { HttpParams } from "@angular/common/http";
import { ClienteResponse } from './responses/clientes.response';

@Injectable({
    providedIn: 'root'
})
export class ClientesApiService {
    public constructor(
        protected appClient: AppClient) {}

    public getClientes(pagenumber: number, pageSize: number, parametros: any): Observable<DTO<PaginationResult<ClienteResponse>>> {
        let params = new HttpParams();
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key)) {
              params = params.set(key, parametros[key].toString());
            }
        }

        return this.appClient.HttpGet<PaginationResult<ClienteResponse>>(`clientes/${pagenumber}/${pageSize}`, { 
            params: params
        });
    }

    public createUser(createUserRequest: CreateUserRequest): Observable<DTO<CreateUserResponse>> {
        return this.appClient.HttpPost<CreateUserResponse>("usuarios", createUserRequest, {});
    }
}
