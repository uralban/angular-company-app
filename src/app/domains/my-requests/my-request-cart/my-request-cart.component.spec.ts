import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyRequestsCartComponent} from './my-request-cart.component';

describe('MyRequestsCartComponent', () => {
  let component: MyRequestsCartComponent;
  let fixture: ComponentFixture<MyRequestsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyRequestsCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyRequestsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
