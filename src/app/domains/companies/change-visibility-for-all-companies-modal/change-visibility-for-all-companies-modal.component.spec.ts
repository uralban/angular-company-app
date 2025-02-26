import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeVisibilityForAllCompaniesModalComponent} from './change-visibility-for-all-companies-modal.component';

describe('ChangeVisibilityForAllCompaniesModalComponent', () => {
  let component: ChangeVisibilityForAllCompaniesModalComponent;
  let fixture: ComponentFixture<ChangeVisibilityForAllCompaniesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeVisibilityForAllCompaniesModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChangeVisibilityForAllCompaniesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
