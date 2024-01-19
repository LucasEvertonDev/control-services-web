import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { take } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { TotalizadoresResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/totalizadores.response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  public date: Date = new Date();
  public totalizador!: TotalizadoresResponse;
 
  @Input("chart") chart: string = "myChart";

  public constructor(private atendimentoApiService: AtendimentoApiService) {
    this.atendimentoApiService.getTotalizadores()
      .pipe(take(1))
      .subscribe((response) => {
        if(response) {
          this.totalizador = response.content;
        }
      });
  }

  private data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  public ngAfterViewInit(): void {
    var myChart = new Chart(this.chart, {
      type: 'doughnut',
      data: this.data
    });
  }
}
