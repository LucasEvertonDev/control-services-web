import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { environment } from "src/environments/environment";
import { optionsHttp } from "./models/options.model";
import { ResponseDto } from "./models/response.model";
import { SnackBarService } from "src/app/shared/services/snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class AppClient {
    protected urlApiBase!: string;

    constructor(private readonly _httpClient: HttpClient,
        private snackbarService: SnackBarService) {
        this.SetBaseUrl(environment.ApiUrl);
    }

    public HttpGet<T>(endpoint: string, options?: optionsHttp): Observable<ResponseDto<T>> {
        return this._httpClient.get<ResponseDto<T>>(`${this.urlApiBase}${endpoint}`, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpPost<T>(endpoint: string, body: any, options?: optionsHttp): Observable<ResponseDto<T>> {
        return this._httpClient.post<ResponseDto<T>>(`${this.urlApiBase}${endpoint}`, body, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpPut<T>(endpoint: string, body: any, options?: optionsHttp): Observable<ResponseDto<T>> {
        return this._httpClient.put<ResponseDto<T>>(`${this.urlApiBase}${endpoint}`, body, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public HttpDelete<T>(endpoint: string, options?: optionsHttp): Observable<ResponseDto<T>> {
        return this._httpClient.delete<ResponseDto<T>>(`${this.urlApiBase}${endpoint}`, options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of(this.handleError<T>(error));
                })
            );
    }

    public SetBaseUrl(baseUrl: string): void {
        this.urlApiBase = baseUrl;
    }

    protected handleError<T>(error: HttpErrorResponse): ResponseDto<T> {
        if (error.error && error.error.error) {
            var response = error.error as ResponseDto<T>;

            this.snackbarService.ShowErrors(response.error.messages);

            return response;
        }

        this.snackbarService.ShowError("Não foi possível se comunicar com a api!");

        return { 
            error: { details: error.error, messages: ["Algo inesperado aconteceu por favor contate o administrador do sistema"] },
            httpCode: 500,
            success: false,
            content: {} as T
        }
    };
}
