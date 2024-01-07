import { Component, OnDestroy, OnInit, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AvisoService } from '../../services/snackbar.service';

@Component({
  selector: 'app-component-base',
  template: '',
  styles: ''
})
export class BaseComponent implements OnDestroy{
  // takeUntil(this.ngUnsubscribe$)
  protected readonly ngUnsubscribe$: Subject<void> = new Subject<void>();
  public novaEntrada!: boolean;
  protected formBuilder: FormBuilder;
  protected actvatedRouter: ActivatedRoute;
  protected avisoService: AvisoService;

  public constructor(protected inject: Injector) {
    this.formBuilder = inject.get(FormBuilder);
    this.actvatedRouter = inject.get(ActivatedRoute);
    this.avisoService = inject.get(AvisoService);

    this.novaEntrada = !(this.actvatedRouter.snapshot.url[0]?.path === 'edit');
  }

  public ngOnDestroy(): void {
      // Emit a value so that takeUntil will handle the closing of our subscriptions;
      this.ngUnsubscribe$.next();
      // Unsubscribe from our unsubscriber to avoid creating a memory leak
      this.ngUnsubscribe$.unsubscribe();
  }
  
  public exibiDescricaoItem(opcao: any): string {
    return opcao ? opcao.descricao : '';
  }
}
