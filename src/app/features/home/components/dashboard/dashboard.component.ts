import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { TotalizadoresResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/totalizadores.response';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('conteudoParaPDF') conteudoParaPDF!: ElementRef; 
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

  // sendToPdf2() {
  //   const content = this.pdfContent.nativeElement;

  //   const options = {
  //     useCORS: true,
  //     margin: 0,
  //     filename: 'document.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //   };

  //   html2pdf().from(content).set(options).save();
  // }

  sendToPdf() {
    const content = this.conteudoParaPDF.nativeElement;

    if(!content) return;

    html2canvas(content, { scale:4, backgroundColor: '#eee' }).then((canvas) => {
      // Configuração do PDF
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Adiciona a imagem convertida ao PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Adicione mais conteúdo ou páginas conforme necessário
      // Exemplo: pdf.addPage(); pdf.text('Outro conteúdo', 10, 10);

      // Salva ou exibe o PDF
      pdf.save('documento.pdf');
    });
  }
}
