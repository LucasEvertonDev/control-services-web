import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { TotalizadoresResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/totalizadores.response';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  public date: Date = new Date();
  public totalizador: TotalizadoresResponse = {
    agendados: 0,
    concluidos: 0,
    lucro: 0,
    receber: 0
  };

  public constructor(private atendimentoApiService: AtendimentoApiService) {
    this.atendimentoApiService.getTotalizadores()
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.totalizador = response.content;
        }
      });
  }

  sendToPdf() {
    const content = this.pdfContent.nativeElement;

    const options = {
      useCORS: true,
      margin: 0,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content).set(options).save();
  }
}
