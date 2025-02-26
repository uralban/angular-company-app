import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyInvitationCartComponent} from './my-invitation-cart.component';

describe('MyInitationCartComponent', () => {
  let component: MyInvitationCartComponent;
  let fixture: ComponentFixture<MyInvitationCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyInvitationCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyInvitationCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
