import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleQuizCartComponent} from './single-quiz-cart.component';

describe('SingleQuizCartComponent', () => {
  let component: SingleQuizCartComponent;
  let fixture: ComponentFixture<SingleQuizCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleQuizCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleQuizCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
