import { AfterViewInit, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-grafico-melhores-clientes',
  templateUrl: './grafico-melhores-clientes.component.html',
  styleUrl: './grafico-melhores-clientes.component.scss'
})
export class GraficoMelhoresClientesComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;
  constructor(private renderer: Renderer2) {
    
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
    setTimeout(() => {
      var c = new Chart(this.myChart.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: this.data
      });
    }, 1000);
  }
}
