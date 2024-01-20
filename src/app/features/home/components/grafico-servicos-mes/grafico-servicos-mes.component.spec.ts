import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoServicosMesComponent } from './grafico-servicos-mes.component';

describe('GraficoServicosMesComponent', () => {
  let component: GraficoServicosMesComponent;
  let fixture: ComponentFixture<GraficoServicosMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoServicosMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoServicosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
