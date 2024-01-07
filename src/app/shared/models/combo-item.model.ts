import { Observable } from "rxjs";

export interface ComboItem {
    descricao: string;
    valor: string;
}

export class ComboItemGroup {
    public itens!: ComboItem[];
    public itensFiltrados!: Observable<ComboItem[]>;
}