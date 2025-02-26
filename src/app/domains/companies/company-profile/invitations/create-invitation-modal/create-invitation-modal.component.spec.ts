import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateInvitationModalComponent} from './create-invitation-modal.component';

describe('CreateInvitationModalComponent', () => {
  let component: CreateInvitationModalComponent;
  let fixture: ComponentFixture<CreateInvitationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInvitationModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateInvitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
