import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestCartComponent} from './request-cart.component';

describe('RequestCartComponent', () => {
  let component: RequestCartComponent;
  let fixture: ComponentFixture<RequestCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
