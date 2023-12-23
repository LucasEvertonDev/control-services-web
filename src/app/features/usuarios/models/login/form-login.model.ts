import { FormControl } from "@angular/forms";

export interface FormLogin {
    username: FormControl<string>;
    password: FormControl<string>;
}