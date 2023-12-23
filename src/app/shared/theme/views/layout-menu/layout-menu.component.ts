import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/scripts/scripts.service';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.scss']
})
export class LayoutMenuComponent  implements OnInit, AfterViewInit{

  public constructor(private _scripts:ScriptsService) {
  }

  public ngAfterViewInit(): void {
    this._scripts.loadMenuScripts();
  }

  public ngOnInit(): void {
  }
}

