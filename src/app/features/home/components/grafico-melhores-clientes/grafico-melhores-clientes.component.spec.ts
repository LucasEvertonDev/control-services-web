import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMelhoresClientesComponent } from './grafico-melhores-clientes.component';

describe('GraficoMelhoresClientesComponent', () => {
  let component: GraficoMelhoresClientesComponent;
  let fixture: ComponentFixture<GraficoMelhoresClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoMelhoresClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoMelhoresClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
