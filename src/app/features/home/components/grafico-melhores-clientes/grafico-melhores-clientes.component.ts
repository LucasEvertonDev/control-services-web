import { ClienteResponse } from 'src/app/core/api/services/clientes-endpoint/responses/clientes.response';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { AfterViewInit, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, Legend, plugins, registerables } from 'chart.js';
import { take } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-melhores-clientes',
  templateUrl: './grafico-melhores-clientes.component.html',
  styleUrl: './grafico-melhores-clientes.component.scss'
})
export class GraficoMelhoresClientesComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;
  constructor(private clientesApiService: ClientesApiService) {
  }

  private getChartConfiguration(clientes: ClienteResponse[]): ChartData {
    return {
      labels: clientes.map(cliente => cliente.nome),
      datasets: [{
        label: 'Número de Atendimentos',
        data: clientes.map(cliente => cliente.numeroAtendimentos),
        backgroundColor: [
          'rgb(255, 182, 193)',   // Tom pastel de Rosa
          'rgb(144, 238, 144)',   // Tom pastel de Verde
          'rgb(173, 216, 230)',   // Tom pastel de Azul
          'rgb(255, 255, 153)',   // Tom pastel de Amarelo
          'rgb(221, 160, 221)',   // Tom pastel de Roxo
          'rgb(152, 251, 152)',   // Tom pastel de Verde claro
        ],
      }],
    }
  }

  private getOptions(clientes: ClienteResponse[]): ChartOptions {
    var options: ChartOptions = {
      layout: {
        autoPadding: true,
      },
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            title(tooltipItems) {
              tooltipItems[0].label = clientes[tooltipItems[0].dataIndex].nome
            },
          },
        },
      },
    };
    return options;
  }

  public ngAfterViewInit(): void {
    setTimeout(() =>
      this.clientesApiService.getMelhoresClientes()
        .pipe(take(1))
        .subscribe((response) => {
          var c = new Chart(this.myChart.nativeElement.getContext('2d'), {
            type: 'doughnut',
            data: this.getChartConfiguration(response),
            options: this.getOptions(response)
          });
        }), 1000);
  }
}
