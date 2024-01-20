import { AfterViewInit, Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { TotalizadoresResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/totalizadores.response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  public date: Date = new Date();
  public totalizador!: TotalizadoresResponse;

  public constructor(private atendimentoApiService: AtendimentoApiService) {
    this.atendimentoApiService.getTotalizadores()
    .pipe(take(1))
    .subscribe((response) => {
      if(response) {
        this.totalizador = response.content;
      }
    });
  }
}
