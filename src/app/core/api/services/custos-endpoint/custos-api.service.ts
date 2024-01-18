import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { DTO, PaginationResult } from "../../structure/response.model";
import { CustosResponse } from "./response/custos.response";
import { HttpParams } from "@angular/common/http";

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
}
