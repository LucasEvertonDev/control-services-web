import { AfterViewInit, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable, defer, fromEvent, of, switchMap } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-servicos-mes',
  templateUrl: './grafico-servicos-mes.component.html',
  styleUrl: './grafico-servicos-mes.component.scss'
})
export class GraficoServicosMesComponent implements AfterViewInit {
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
        data: this.data,
        options: {
          layout: {
            autoPadding: true,
          },
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });
    }, 1000);
  }
}
