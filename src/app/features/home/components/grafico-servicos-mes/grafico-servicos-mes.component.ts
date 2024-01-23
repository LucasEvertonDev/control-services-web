import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-servicos-mes',
  templateUrl: './grafico-servicos-mes.component.html',
  styleUrl: './grafico-servicos-mes.component.scss'
})
export class GraficoServicosMesComponent implements AfterViewInit {
  public valores: Data[] = [
    { key: 'Corte Cabelo', valor: 14, hidden: false, color: 'rgb(255, 99, 132)' },
    { key: 'Barba', valor : 30, hidden: false, color: 'rgb(54, 162, 235)' },
    { key: 'Sombracelha',valor : 49, hidden: false, color: 'rgb(255, 205, 86)'}
  ];
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private renderer: Renderer2) {
    
  }

  public doughnutChartLabels: string[] = this.valores.map(ma => ma.key);
  public doughnutChartDatasets: ChartDataset[] = [{
    label: 'Número de Serviços:',
    data: this.valores.map(ma => ma.valor),
    backgroundColor: this.valores.map(ma => ma.color)
  }];
 
  public doughnutChartOptions: ChartOptions = {
    responsive: true
  };
 
  legendaClick(posicao: number, item: string) {
    this.valores[posicao].hidden = !this.valores[posicao].hidden;

    this.doughnutChartDatasets = [{
      label: 'Número de Serviços:',
      data: this.valores.filter((item) => !item.hidden).map(ma => ma.valor),
      backgroundColor: this.valores.filter((item) => !item.hidden).map(ma => ma.color)
    }]

    this.chart?.chart?.update()
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