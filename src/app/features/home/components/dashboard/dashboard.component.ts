import { AfterViewInit, Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { TotalizadoresResponse } from 'src/app/core/api/services/atendimentos-endpoint/responses/totalizadores.response';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
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
      if(response) {
        this.totalizador = response.content;
      }
    });
  }



sendToPdf(){
  let data = document.getElementById("test"); 

  if(!data) {
    return;
  }
    // let data = document.getElementById("maindiv");
    console.log(data);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
      console.log(contentDataURL);  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Filename.pdf');   
    }); 
}
}
