import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { environment } from "src/environments/environment";
import { optionsHttp } from "./structure/options.model";
import { DTO } from "./structure/response.model";
import { AvisoService } from "src/app/shared/services/snackbar.service";
import { AuthorizationService } from "../services/authorization.services";

@Injectable({
    providedIn: 'root'
})
export class AppClient {
    protected urlApiBase!: string;

    constructor(private readonly _httpClient: HttpClient,
        private AvisoService: AvisoService,
        private authorizationService: AuthorizationService) {
        this.SetBaseUrl(environment.ApiUrl);
    }

    public HttpGet<T>(endpoint: string, options?: optionsHttp): Observable<DTO<T>> {
        return this._httpClient.get<DTO<T>>(`${this.urlApiBase}${endpoint}`, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpPost<T>(endpoint: string, body: any, options?: optionsHttp): Observable<DTO<T>> {
        return this._httpClient.post<DTO<T>>(`${this.urlApiBase}${endpoint}`, body, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpPut<T>(endpoint: string, body: any, options?: optionsHttp): Observable<DTO<T>> {
        return this._httpClient.put<DTO<T>>(`${this.urlApiBase}${endpoint}`, body, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpDelete<T>(endpoint: string, options?: optionsHttp): Observable<DTO<T>> {
        return this._httpClient.delete<DTO<T>>(`${this.urlApiBase}${endpoint}`, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public SetBaseUrl(baseUrl: string): void {
        this.urlApiBase = baseUrl;
    }

    protected handleError<T>(error: HttpErrorResponse): DTO<T> {
        if (error.error && error.error.error) {
            var response = error.error as DTO<T>;

            this.AvisoService.ShowErrors(response.error.messages);

            return response;
        }

        this.AvisoService.ShowError("Não foi possível se comunicar com a api!");

        return { 
            error: { details: error.error, messages: ["Algo inesperado aconteceu por favor contate o administrador do sistema"] },
            httpCode: 500,
            success: false,
            content: {} as T
        }
    };
}
