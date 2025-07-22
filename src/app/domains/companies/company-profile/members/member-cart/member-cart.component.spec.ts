import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberCartComponent} from './member-cart.component';

describe('MemberCartComponent', () => {
  let component: MemberCartComponent;
  let fixture: ComponentFixture<MemberCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
