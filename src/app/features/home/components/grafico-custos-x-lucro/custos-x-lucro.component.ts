import { Component } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { take, map } from 'rxjs';
import { CustosApiService } from 'src/app/core/api/services/custos-endpoint/custos-api.service';

@Component({
  selector: 'app-custos-x-lucro',
  templateUrl: './custos-x-lucro.component.html',
  styleUrl: './custos-x-lucro.component.scss'
})
export class CustosXLucroComponent {
  public barChartLabels!: string[];
  public barChartDatasets!: ChartDataset[]
  public barChartOptions!: any;

  public constructor(private custosApiService: CustosApiService){
    this.custosApiService.getGastosXLucro()
    .pipe(take(1))
    .subscribe((response) => {
      this.barChartLabels = response.content.map(item => item.chave);

      this.barChartDatasets = [
        { data: response.content.map(item => item.resultado.ganho ?? 0), label: 'Ganhos'},
        { data: response.content.map(item => item.resultado.custo ?? 0), label: 'Gastos' },
        { data: response.content.map(item => item.resultado.lucro ?? 0), label: 'Lucros'}
      ]
      
      this.barChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
        plugins: {
         legend: {
           display: true,
           position: 'bottom' 
         }
        }
      };
    });
  }
}
