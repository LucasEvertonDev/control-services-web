import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-servicos-mes',
  templateUrl: './grafico-servicos-mes.component.html',
  styleUrl: './grafico-servicos-mes.component.scss'
})
export class GraficoServicosMesComponent implements AfterViewInit {
  @Input("myChart") chart: string = "myChart";

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
