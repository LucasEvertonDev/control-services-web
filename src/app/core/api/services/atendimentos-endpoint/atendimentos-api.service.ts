import { AuthorizationService } from 'src/app/core/services/authorization.services';
import { AtendimentoResponse } from './responses/atendimento.response';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable, of } from "rxjs";
import { DTO, PaginationResult } from "../../structure/response.model";
import { CreateAtendimentoRequest } from './requests/create-atendimento.request';
import { CreateAtendimentoResponse } from './responses/create-atendimento.response';
import { HttpParams } from "@angular/common/http";
import { UpdateAtendimentoRequest } from './requests/update-atendimento.request';
import { UpdateAtendimentoResponse } from './responses/update-atendimento.response';
import { RemarcarAtendimentoRequest } from './requests/remarcar-atendimento.request';
import { RemarcarAtendimentoResponse } from './responses/remarcar-atendimento.response';
import { TotalizadoresResponse } from './responses/totalizadores.response';
import { DateHelper } from 'src/app/core/helpers/date-helper';

@Injectable({
    providedIn: 'root'
})
export class AtendimentoApiService {
    public constructor(
        protected appClient: AppClient, 
        protected authorizationService: AuthorizationService) {}

    public createAtendimento(createCreateAtendimentoRequest: CreateAtendimentoRequest): Observable<DTO<CreateAtendimentoResponse>> {
        return this.appClient.HttpPost<CreateAtendimentoResponse>("atendimentos", createCreateAtendimentoRequest, {});
    }

    public updateAtendimento(id: string, updateAtendimento: UpdateAtendimentoRequest): Observable<DTO<UpdateAtendimentoResponse>> {
        return this.appClient.HttpPut<UpdateAtendimentoResponse>(`atendimentos/${id}`, updateAtendimento, {});
    }

    public remarcarAtendimento(id: string, remarcarAtendimentoRequest: RemarcarAtendimentoRequest): Observable<DTO<RemarcarAtendimentoResponse>> {
        return this.appClient.HttpPut<RemarcarAtendimentoResponse>(`atendimentos/remarcar/${id}`, remarcarAtendimentoRequest, {});
    }

    public getAtendimentos(pagenumber: number, pageSize: number, parametros: any): Observable<DTO<PaginationResult<AtendimentoResponse>> | null> {
        if (!this.authorizationService.usuarioEstaLogadoRedirect()) {
            return of(null);
        }
       
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
    public getTotalizadores(): Observable<DTO<TotalizadoresResponse>> {
        let params = new HttpParams();
        var date = new Date();
        params.append('datainicio', DateHelper.formatDate(new Date(date.getFullYear(), date.getMonth(), 1),  "yyyy-MM-dd", false));
        params.append('datafim', DateHelper.formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0),  "yyyy-MM-dd", false));

        return this.appClient.HttpGet<TotalizadoresResponse>(`atendimentos/totalizadores`, {params: params});
    }
}
