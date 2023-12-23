import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.services';

@Component({
  selector: 'app-layout-nav-bar',
  templateUrl: './layout-nav-bar.component.html',
  styleUrls: ['./layout-nav-bar.component.scss']
})
export class LayoutNavBarComponent implements OnInit {
 
  public constructor(
    private router: Router,
    private authorization: AuthorizationService) { }

  public ngOnInit(): void { }

  public signOut(): void {
    this.authorization.logOut();
    this.router.navigateByUrl('/auth');
  }
}
