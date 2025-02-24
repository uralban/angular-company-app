import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizWorkflowComponent } from './quiz-workflow.component';

describe('QuizWorkflowComponent', () => {
  let component: QuizWorkflowComponent;
  let fixture: ComponentFixture<QuizWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizWorkflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
