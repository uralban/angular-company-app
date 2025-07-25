import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyProfileComponent} from './company-profile.component';

describe('CompanyProfileComponent', () => {
  let component: CompanyProfileComponent;
  let fixture: ComponentFixture<CompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyProfileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
