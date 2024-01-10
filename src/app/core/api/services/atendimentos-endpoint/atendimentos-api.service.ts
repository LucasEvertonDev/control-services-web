import { AtendimentoResponse } from './responses/atendimento.response';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { DTO, PaginationResult } from "../../structure/response.model";
import { CreateAtendimentoRequest } from './requests/create-atendimento.request';
import { CreateAtendimentoResponse } from './responses/create-atendimento.response';
import { HttpParams } from "@angular/common/http";
import { UpdateAtendimentoRequest } from './requests/update-atendimento.request';
import { UpdateAtendimentoResponse } from './responses/update-atendimento.response';

@Injectable({
    providedIn: 'root'
})
export class AtendimentoApiService {
    public constructor(
        protected appClient: AppClient) {}

    public createAtendimento(createCreateAtendimentoRequest: CreateAtendimentoRequest): Observable<DTO<CreateAtendimentoResponse>> {
        return this.appClient.HttpPost<CreateAtendimentoResponse>("atendimentos", createCreateAtendimentoRequest, {});
    }

    public updateAtendimento(id: string, updateAtendimento: UpdateAtendimentoRequest): Observable<DTO<UpdateAtendimentoResponse>> {
        return this.appClient.HttpPut<UpdateAtendimentoResponse>(`atendimentos/${id}`, updateAtendimento, {});
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

    public getAtendimentoPorId(id: string): Observable<DTO<AtendimentoResponse>> {
        return this.appClient.HttpGet<AtendimentoResponse>(`atendimentos/${id}`);
    }
}
