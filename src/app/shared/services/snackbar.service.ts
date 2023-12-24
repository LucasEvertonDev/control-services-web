import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(protected snackBar: MatSnackBar) { }

    public ShowError(message: string, durationInSeconds?: number) {
        setTimeout(() => {
            this.snackBar.open(message, '', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: (durationInSeconds ?? 10) * 1000,
                panelClass: ['snack-background-red']
              });
        }, 1000);
    }

    public ShowErrors(messages: string[], durationInSeconds?: number) {
        if (messages) {
            messages.forEach(error => {
                setTimeout(() => {
                    this.snackBar.open(error, '', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: (durationInSeconds ?? 10) * 1000,
                        panelClass: ['snack-background-red'],
                    });
                }, 1000);
            });
        } else {
            setTimeout(() => {
                this.snackBar.open("Não foi possível se comunicar ao servidor!", "", {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: (durationInSeconds ?? 10) * 1000,
                    panelClass: ['snack-background-red']
                });
            }, 1000);
        }
    }

    public ShowSucess(message: string, durationInSeconds?: number) {
        setTimeout(() => {
            this.snackBar.open(message, "", {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: (durationInSeconds ?? 10) * 1000,
                panelClass: ['snack-background-green']
            });
        }, 1000);
    }
}

