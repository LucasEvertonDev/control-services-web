import { ClienteResponse } from 'src/app/core/api/services/clientes-endpoint/responses/clientes.response';
import { ClientesApiService } from 'src/app/core/api/services/clientes-endpoint/clientes-api.service';
import { AfterViewInit, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartOptions, Legend, plugins, registerables } from 'chart.js';
import { take } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-melhores-clientes',
  templateUrl: './grafico-melhores-clientes.component.html',
  styleUrl: './grafico-melhores-clientes.component.scss'
})
export class GraficoMelhoresClientesComponent {
  public valores!: Data[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public doughnutChartLabels!: string[];
  public doughnutChartDatasets!: ChartDataset[];
  public doughnutChartOptions!: ChartOptions;
 
  constructor(private clientesApiService: ClientesApiService) {
    this.clientesApiService.getMelhoresClientes()
      .pipe(take(1))
      .subscribe((response) => {
        this.valores = response.map<Data>((item, index) => {
          var data: Data = {
            key: item.nome,
            hidden: false,
            valor: item.numeroAtendimentos ?? 0,
            color: this.getColors()[index]
          }
          return data
        })

        this.doughnutChartDatasets = [{
          label: 'Número de Atendimentos',
          data: this.valores.map(ma => ma.valor),
          backgroundColor: this.valores.map(ma => ma.color)
        }];

        this.doughnutChartLabels = this.valores.map(ma => ma.key);

        this.doughnutChartOptions = {
          responsive: true
        };
      });
  }

  legendaClick(posicao: number, item: string) {
    var elemento = this.valores.filter(filter => filter.key === item)[0];
    elemento.hidden = !elemento.hidden;

    this.doughnutChartDatasets = [{
      label: 'Número de Atendimentos',
      data: this.valores.filter((item) => !item.hidden).map(ma => ma.valor),
      backgroundColor: this.valores.filter((item) => !item.hidden).map(ma => ma.color)
    }];

    this.doughnutChartLabels = this.valores.filter((item) => !item.hidden).map(ma => ma.key);

    this.chart?.chart?.update();
  }
  
  private getColors(): string[] {
    return [
      'rgb(255, 182, 193)',   // Tom pastel de Rosa
      'rgb(144, 238, 144)',   // Tom pastel de Verde
      'rgb(173, 216, 230)',   // Tom pastel de Azul
      'rgb(255, 255, 153)',   // Tom pastel de Amarelo
      'rgb(221, 160, 221)',   // Tom pastel de Roxo
      'rgb(152, 251, 152)',   // Tom pastel de Verde claro
    ];
  }
}

export interface Data {
  key: string,
  hidden: boolean,
  valor: number,
  color: string
}