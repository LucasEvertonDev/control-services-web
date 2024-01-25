import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustosXLucroComponent } from './custos-x-lucro.component';

describe('CustosXLucroComponent', () => {
  let component: CustosXLucroComponent;
  let fixture: ComponentFixture<CustosXLucroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustosXLucroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustosXLucroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
