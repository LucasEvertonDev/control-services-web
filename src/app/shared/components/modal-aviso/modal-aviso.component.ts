import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.scss']
})
export class ModalAvisoComponent {
   public constructor(@Inject(MAT_DIALOG_DATA) public data: ModalAvisoModel) {}
}

export interface ModalAvisoModel {
  tipo: string,
  mensagem: string
}