import { ModalAvisoModel } from './../components/modal-aviso/modal-aviso.component';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ModalAvisoComponent } from "../components/modal-aviso/modal-aviso.component";

@Injectable({
    providedIn: 'root'
})
export class AvisoService {
    constructor(
        protected matDialog: MatDialog) { }

    public ShowError(message: string, durationInSeconds?: number) {
        setTimeout(() => {
            const dialogRef = this.matDialog.open(ModalAvisoComponent, {
                data: {
                    tipo: 'error',
                    mensagem: message
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                let x = result;
            });
        }, 1000);
    }

    public ShowErrors(messages: string[], durationInSeconds?: number) {
        if (messages) {
            setTimeout(() => {
                const dialogRef = this.matDialog.open(ModalAvisoComponent, {
                    data: {
                        tipo: 'error',
                        mensagem: messages.join('\n')
                    },
                });

                dialogRef.afterClosed().subscribe(result => {
                    let x = result;
                });
            }, 1000);
        } else {
            setTimeout(() => {
                const dialogRef = this.matDialog.open(ModalAvisoComponent, {
                    data: {
                        tipo: 'error',
                        mensagem: 'Algo inesperado aconteceu. Por favor contate o administrador do sistema.'
                    },
                });
    
                dialogRef.afterClosed().subscribe(result => {
                    let x = result;
                });
            }, 1000);
        }
    }

    public ShowSucess(message: string, durationInSeconds?: number) {
        setTimeout(() => {
            const dialogRef = this.matDialog.open(ModalAvisoComponent, {
                data: {
                    tipo: 'success',
                    mensagem: message
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                let x = result;
            });
        }, 1000);
    }
}

