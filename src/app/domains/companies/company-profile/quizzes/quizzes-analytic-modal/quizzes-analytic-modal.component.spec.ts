import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesAnalyticModalComponent} from './quizzes-analytic-modal.component';

describe('QuizzesAnaluticModalComponent', () => {
  let component: QuizzesAnalyticModalComponent;
  let fixture: ComponentFixture<QuizzesAnalyticModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzesAnalyticModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizzesAnalyticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
