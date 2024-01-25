import { Component } from '@angular/core';

@Component({
  selector: 'app-custos-x-lucro',
  templateUrl: './custos-x-lucro.component.html',
  styleUrl: './custos-x-lucro.component.scss'
})
export class CustosXLucroComponent {
  public constructor(){
  }

   // Dados para o gráfico de barras verticais
   barChartLabels: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
   barChartDatasets: any[] = [
     { data: [10, 20, 30, 22, 33, 31 ], label: 'Ganhos' },
     { data: [13, 24, 32, 33, 44, 22 ], label: 'Gastos' },
     { data: [10, 20, 30, 44, 47, 44 ], label: 'Lucros' },
     // Adicione mais séries conforme necessário
   ];
 
   // Opções para o gráfico de barras verticais
   barChartOptions: any = {
     responsive: true,
     scales: {
       xAxes: [{ stacked: true }],
       yAxes: [{ stacked: true }]
     },
     plugins: {
      legend: {
        display: true,
        position: 'bottom' // You can use 'top', 'bottom', 'left', 'right', or 'chartArea'
      }
     }
     // Adicione mais opções conforme necessário
   };
}
