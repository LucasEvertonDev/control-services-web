import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { DTO, PaginationResult } from "../../structure/response.model";
import { CustosResponse } from "./response/custos.response";
import { HttpParams } from "@angular/common/http";
import { CreateCustoRequest } from "./request/create-custo.request";
import { CreateCustoResponse } from "./response/create-custo-response";
import { UpdateCustoRequest } from "./request/update-custo.request";
import { UpdateCustoResponse } from "./response/update-custo.response";
import { GastosXLucroResponse } from "./response/gastos-x-lucro.response";

@Injectable({
    providedIn: 'root'
})
export class CustosApiService {
    public constructor(
        protected appClient: AppClient) {}

    public getCustos(pagenumber: number, pageSize: number, parametros: any): Observable<DTO<PaginationResult<CustosResponse>>> {
        let params = new HttpParams();
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key) && parametros[key]) {
                params = params.set(key, parametros[key]);
            }
        }

        return this.appClient.HttpGet<PaginationResult<CustosResponse>>(`custos/${pagenumber}/${pageSize}`, { 
            params: params
        });
    }

    public createCusto(createCustoRequest: CreateCustoRequest): Observable<DTO<CreateCustoResponse>> {
        return this.appClient.HttpPost<CreateCustoResponse>("custos", createCustoRequest, {});
    }

    public getCustoPorId(id: string): Observable<DTO<CustosResponse>> {
        return this.appClient.HttpGet<CustosResponse>(`custos/${id}`);
    }

    public getGastosXLucro(): Observable<DTO<GastosXLucroResponse[]>> {
        return this.appClient.HttpGet<GastosXLucroResponse[]>(`custos/gastosxlucro`);
    }

    public updateCusto(id: string, updateCustoRequest: UpdateCustoRequest): Observable<DTO<UpdateCustoResponse>> {
        return this.appClient.HttpPut<UpdateCustoResponse>(`custos/${id}`, updateCustoRequest, {});
    }
}
