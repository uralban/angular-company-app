import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCompanyCartComponent } from './single-company-cart.component';

describe('SingleCompanyCartComponent', () => {
  let component: SingleCompanyCartComponent;
  let fixture: ComponentFixture<SingleCompanyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCompanyCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCompanyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
