import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvitationCartComponent} from './invitation-cart.component';

describe('InvitationCartComponent', () => {
  let component: InvitationCartComponent;
  let fixture: ComponentFixture<InvitationCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvitationCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
