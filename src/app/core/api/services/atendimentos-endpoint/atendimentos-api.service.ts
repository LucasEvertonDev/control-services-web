import { AtendimentoResponse } from './responses/atendimento.response';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { DTO, PaginationResult } from "../../structure/response.model";
import { CreateAtendimentoRequest } from './requests/create-atendimento.request';
import { CreateAtendimentoResponse } from './responses/create-atendimento.response';
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AtendimentoApiService {
    public constructor(
        protected appClient: AppClient) {}

    public createAtendimento(createCreateAtendimentoRequest: CreateAtendimentoRequest): Observable<DTO<CreateAtendimentoResponse>> {
        return this.appClient.HttpPost<CreateAtendimentoResponse>("atendimentos", createCreateAtendimentoRequest, {});
    }

    public getAtendimentos(pagenumber: number, pageSize: number, parametros: any): Observable<DTO<PaginationResult<AtendimentoResponse>>> {
        let params = new HttpParams();
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key) && parametros[key]) {
              params = params.set(key, parametros[key].toString());
            }
        }

        return this.appClient.HttpGet<PaginationResult<AtendimentoResponse>>(`atendimentos/${pagenumber}/${pageSize}`, { 
            params: params
        });
    }

}
