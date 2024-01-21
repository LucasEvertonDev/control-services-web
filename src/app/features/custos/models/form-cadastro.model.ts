import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { CreateCustoRequest } from "src/app/core/api/services/custos-endpoint/request/create-custo.request";
import { UpdateCustoRequest } from "src/app/core/api/services/custos-endpoint/request/update-custo.request";
import { DateHelper } from "src/app/core/helpers/date-helper";

export class FormCadastroCusto {
    public constructor(custoResponse?: any) {
        this.id = new FormControl<string | null>(
            { value: custoResponse?.id ?? null, disabled: false },
            { nonNullable: true, validators: [] },)
        this.data = new FormControl<Date | null | any>(
            { value: custoResponse?.data ? moment(custoResponse.data) : moment(new Date()), disabled: false },
            { nonNullable: true, validators: [Validators.required] },);
        this.descricao = new FormControl<string | string>(
            { value: custoResponse?.descricao ?? '', disabled: false },
            { nonNullable: true, validators: [Validators.required] },);
        this.valor = new FormControl<number>(
            { value: custoResponse?.valor ?? 0, disabled: false },
            { nonNullable: true, validators: [Validators.required] },);
    }

    public static getCreateCustoRequest(formGroup: FormGroup<FormCadastroCusto>): CreateCustoRequest {
        let formData = formGroup.getRawValue();

        return {
            data: DateHelper.formatDate(formData.data.toDate(), `yyyy-MM-dd`, false),
            descricao: formData.descricao,
            valor: formData.valor
        };
    }

    public static getUpdateCustoRequest(formGroup: FormGroup<FormCadastroCusto>): UpdateCustoRequest {
        let formData = formGroup.getRawValue();

        return {
            data: DateHelper.formatDate(formData.data.toDate(), `yyyy-MM-dd`, false),
            descricao: formData.descricao,
            valor: formData.valor
        };
    }

    public id: FormControl<string | null>;
    public data: FormControl<Date | null | any>;
    public descricao: FormControl<string | string>;
    public valor: FormControl<number>;
}