import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public authorization: boolean = false;

  public constructor(private authorizationService: AuthorizationService) {

  }

  public ngOnInit(): void {
    this.authorizationService.usuarioEstaLogado()
      .subscribe((estaLogado) => {
        this.authorization = estaLogado
      });
  }
}
