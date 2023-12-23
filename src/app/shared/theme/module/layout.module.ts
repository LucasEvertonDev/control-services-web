import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../views/layout/layout.component';
import { LayoutFooterComponent } from '../views/layout-footer/layout-footer.component';
import { LayoutAccountComponent } from '../views/layout-account/layout-account.component';
import { LayoutMenuComponent } from '../views/layout-menu/layout-menu.component';
import { LayoutNavBarComponent } from '../views/layout-nav-bar/layout-nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent,
    LayoutAccountComponent,
    LayoutFooterComponent,
    LayoutMenuComponent,
    LayoutNavBarComponent
  ],
  exports: [
    LayoutComponent,
    LayoutAccountComponent,
    LayoutFooterComponent,
    LayoutMenuComponent,
    LayoutNavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
