import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionDto} from '../../../../interfaces/quiz/question.dto';
import {QuestionAttemptAnswerDto} from '../../../../interfaces/quiz/question-attempt-answer.dto';

@Component({
  selector: 'single-question',
  standalone: false,
  templateUrl: './single-question.component.html'
})
export class SingleQuestionComponent implements OnInit {
  @Input() question!: QuestionDto
  @Output() answersChange: EventEmitter<QuestionAttemptAnswerDto> = new EventEmitter()

  private newChangedQuestion: QuestionAttemptAnswerDto = new QuestionAttemptAnswerDto();

  public ngOnInit(): void {
    this.newChangedQuestion.questionId = this.question.id;
    this.newChangedQuestion.answersIdList = [];
  }

  public answerChange(event: Event, answerId: string | undefined): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.checked && answerId) {
      this.newChangedQuestion.answersIdList?.push(answerId);
    } else {
      this.newChangedQuestion.answersIdList?.splice(this.newChangedQuestion.answersIdList?.findIndex(existAnswerId => existAnswerId === answerId), 1);
    }
    this.answersChange.emit(this.newChangedQuestion);
  }
}
