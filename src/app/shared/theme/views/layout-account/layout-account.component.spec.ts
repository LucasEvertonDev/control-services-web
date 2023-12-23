import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAccountComponent } from './layout-account.component';

describe('LayoutAccountComponent', () => {
  let component: LayoutAccountComponent;
  let fixture: ComponentFixture<LayoutAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutAccountComponent]
    });
    fixture = TestBed.createComponent(LayoutAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
