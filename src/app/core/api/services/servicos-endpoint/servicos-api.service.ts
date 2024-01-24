import { PaginationResult } from '../../structure/response.model';
import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable, map } from "rxjs";
import { DTO } from "../../structure/response.model";
import { HttpParams } from "@angular/common/http";
import { ServicoResponse } from './responses/servicos.response';
import { CreateServicoRequest } from './requests/create-servico.request';
import { CreateServicoResponse } from './responses/create-servico.response';
import { UpdateServicoRequest } from './requests/update-servico.request';
import { UpdateServicoResponse } from './responses/update-servico.response';

@Injectable({
    providedIn: 'root'
})
export class ServicoApiService {
    public constructor(
        protected appClient: AppClient) {}

    public getServicos(pagenumber: number, pageSize: number, parametros: any): Observable<DTO<PaginationResult<ServicoResponse>>> {
        let params = new HttpParams();
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key)) {
              params = params.set(key, parametros[key].toString());
            }
        }

        return this.appClient.HttpGet<PaginationResult<ServicoResponse>>(`servicos/${pagenumber}/${pageSize}`, { 
            params: params
        });
    }

    public getServicoPorId(id: string): Observable<DTO<ServicoResponse>> {
        return this.appClient.HttpGet<ServicoResponse>(`servicos/${id}`);
    }

    public createServico(createServicoRequest: CreateServicoRequest): Observable<DTO<CreateServicoResponse>> {
        return this.appClient.HttpPost<CreateServicoResponse>("servicos", createServicoRequest, {});
    }

    public updateServico(id: string, updateServicoRequest: UpdateServicoRequest): Observable<DTO<UpdateServicoResponse>> {
        return this.appClient.HttpPut<UpdateServicoResponse>(`servicos/${id}`, updateServicoRequest, {});
    }

    public getMelhoresServicos(): Observable<ServicoResponse[]> {
        return this.appClient.HttpGet<PaginationResult<ServicoResponse>>(`servicos/melhores/${1}/${5}`).pipe(
            map(response => response.content.items)
        );
    }
}
