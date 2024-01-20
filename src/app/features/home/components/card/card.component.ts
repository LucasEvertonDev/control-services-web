import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input("themeConfig") public themeConfig!: NgxSkeletonLoaderConfigTheme;
  @Input("totalizadores") public totalizadores!: boolean;
}
