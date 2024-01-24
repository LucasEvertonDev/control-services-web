import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { ServicoApiService } from 'src/app/core/api/services/servicos-endpoint/servicos-api.service';

@Component({
  selector: 'app-grafico-servicos-mes',
  templateUrl: './grafico-servicos-mes.component.html',
  styleUrl: './grafico-servicos-mes.component.scss'
})
export class GraficoServicosMesComponent implements AfterViewInit {
  public valores!: Data[];
  public doughnutChartLabels!: string[];
  public doughnutChartDatasets!: ChartDataset[];
  public doughnutChartOptions!: ChartOptions;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public constructor(private servicosApiService: ServicoApiService) {
    this.servicosApiService.getMelhoresServicos()
      .pipe(take(1))
      .subscribe((response) => {
        this.valores = response.map<Data>((item, index) => {
          var data: Data = {
            key: item.nome,
            hidden: false,
            valor: item.numeroServicos ?? 0,
            color: this.getColors()[index]
          }
          return data
        })

        this.doughnutChartDatasets = [{
          label: 'Número de Serviços',
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
      label: 'Número de Serviços',
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

  public ngAfterViewInit(): void {
  }
}

export interface Data {
  key: string,
  hidden: boolean,
  valor: number,
  color: string
}