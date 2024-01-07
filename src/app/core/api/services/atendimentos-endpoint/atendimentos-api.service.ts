import { Injectable } from "@angular/core";
import { AppClient } from "../../app-client";
import { Observable } from "rxjs";
import { DTO } from "../../structure/response.model";
import { AtendimentoRequest } from './requests/atendimento.request';
import { AtendimentoResponse } from './responses/atendimento.response';

@Injectable({
    providedIn: 'root'
})
export class AtendimentoApiService {
    public constructor(
        protected appClient: AppClient) {}

    public createAtendimento(createAtendimentoRequest: AtendimentoRequest): Observable<DTO<AtendimentoResponse>> {
        return this.appClient.HttpPost<AtendimentoResponse>("atendimentos", createAtendimentoRequest, {});
    }
}
