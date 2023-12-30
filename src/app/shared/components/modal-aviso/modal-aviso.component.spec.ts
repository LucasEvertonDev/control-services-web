import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvisoComponent } from './modal-aviso.component';

describe('ModalAvisoComponent', () => {
  let component: ModalAvisoComponent;
  let fixture: ComponentFixture<ModalAvisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAvisoComponent]
    });
    fixture = TestBed.createComponent(ModalAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
