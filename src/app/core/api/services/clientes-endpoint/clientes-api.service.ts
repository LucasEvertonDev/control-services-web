import { CreateClienteRequest } from './requests/create-cliente.request';
import { PaginationResult } from './../../structure/response.model';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { CreateUserRequest } from "../usuarios-endpoint/requests/create-user.request";
import { CreateUserResponse } from "../usuarios-endpoint/responses/create-user.response";
import { DTO } from "../../structure/response.model";
import { HttpParams } from "@angular/common/http";
import { ClienteResponse } from './responses/clientes.response';
import { CreateClienteResponse } from './responses/create-cliente.response';
import { UpdateClienteRequest } from './requests/update-cliente.request';
import { UpdateClienteResponse } from './responses/update-cliente.response';

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

    public getClientePorId(id: string): Observable<DTO<ClienteResponse>> {
        return this.appClient.HttpGet<ClienteResponse>(`clientes/${id}`);
    }

    public createCliente(createClienteRequest: CreateClienteRequest): Observable<DTO<CreateClienteResponse>> {
        return this.appClient.HttpPost<CreateClienteResponse>("clientes", createClienteRequest, {});
    }

    public updateCliente(id: string, updateClienteRequest: UpdateClienteRequest): Observable<DTO<UpdateClienteResponse>> {
        return this.appClient.HttpPut<UpdateClienteResponse>(`clientes/${id}`, updateClienteRequest, {});
    }
}
