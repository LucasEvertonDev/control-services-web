import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-servicos-mes',
  templateUrl: './grafico-servicos-mes.component.html',
  styleUrl: './grafico-servicos-mes.component.scss'
})
export class GraficoServicosMesComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private renderer: Renderer2) {
    
  }

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartDataset[] = [{
    label: 'Número de Atendimentos',
    data: [14, 30, 49],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ]
  }];
 
  public doughnutChartOptions: ChartOptions = {
    responsive: true
  };
 
  Teste(posicao: number) {
    this.doughnutChartDatasets[0].data.splice(posicao, 1);
    this.chart?.chart?.update()
  }

  public ngAfterViewInit(): void {
    // setTimeout(() => {
    //   var c = new Chart(this.myChart.nativeElement.getContext('2d'), {
    //     type: 'doughnut',
    //     data: this.data,
    //     options: {
    //       layout: {
    //         autoPadding: true,
    //       },
    //       plugins: {
    //         legend: {
    //           position: 'right',
    //         }
    //       }
    //     }
    //   });
    // }, 1000);
  }
}


