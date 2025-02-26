import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {QuestionInterface} from '../../../../../interfaces/quiz/question.interface';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogData} from '../../../../../interfaces/dialog-data.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnswerInterface} from '../../../../../interfaces/quiz/answer.interface';
import {QuizInterface} from '../../../../../interfaces/quiz/quiz.interface';
import {QuizService} from '../../../../../services/quiz/quiz.service';
import {QuestionDto} from '../../../../../interfaces/quiz/question.dto';
import {AnswerDto} from '../../../../../interfaces/quiz/answer.dto';

@Component({
  selector: 'app-quiz-modal',
  standalone: false,
  templateUrl: './quiz-modal.component.html'
})
export class QuizModalComponent implements OnInit {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public quizForm: FormGroup;

  public questionsList: QuestionInterface[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private spinner: PowerSpinnerService,
    private cdr: ChangeDetectorRef,
    private quizService: QuizService,
    private dialogRef: MatDialogRef<QuizModalComponent>,
  ) {
    this.quizForm = this.quizFormInit();
  }

  public ngOnInit(): void {
    if (this.data.quizId) {
      this.spinner.show();
      this.quizService.getQuizById(this.data.quizId).then((quiz) => {
        if (quiz.title) this.quizForm.get('title')?.setValue(quiz.title);
        if (quiz.description) this.quizForm.get('description')?.setValue(quiz.description);
        if (quiz.frequencyInDays) this.quizForm.get('frequencyInDays')?.setValue(quiz.frequencyInDays);
        if (quiz.questions?.length) {
          quiz.questions.forEach((question, index) => {
            this.addQuestion(question);
          });
        }
      }).finally(() => this.spinner.hide());
    } else {
      for (let i: number = 1; i < 3; i++) {
        this.addQuestion();
      }
    }
  }

  private quizFormInit(): FormGroup {
    return this.formBuilder.group({
      title: [undefined, Validators.compose([
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9\s])+$/)
      ])],
      description: [undefined, Validators.pattern(/^([A-Za-z0-9\s])+$/)],
      frequencyInDays: [undefined, Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^([0-9])+$/)
      ])],
    });
  }

  public removeQuestion(question: QuestionInterface): void {
    question.answerOptions.forEach(answer => {
      this.quizForm.removeControl('answerContent_' + question._questionId + '_' + answer._answerId);
    });
    this.quizForm.removeControl('questionContent_' + question._questionId);
    this.quizForm.removeControl('correctAnswer_' + question._questionId);
    this.quizForm.updateValueAndValidity();
    this.questionsList.splice(this.questionsList.findIndex(item => item._questionId === question._questionId), 1);
    this.cdr.detectChanges();
  }

  public removeAnswer(question: QuestionInterface, answer: AnswerInterface): void {
    this.quizForm.removeControl('answerContent_' + question._questionId + '_' + answer._answerId);
    this.quizForm.updateValueAndValidity();
    question.answerOptions.splice(question.answerOptions.findIndex(item => item._answerId === answer._answerId), 1);
    this.cdr.detectChanges();
  }

  public addQuestion(question?: QuestionDto): void {
    const lastQuestion: QuestionInterface = this.questionsList[this.questionsList.length - 1];
    const newId: number = lastQuestion && lastQuestion._questionId ? lastQuestion._questionId + 1 : 1;
    this.quizForm.addControl('correctAnswer_' + newId, new FormControl(undefined, Validators.required));
    this.quizForm.addControl('questionContent_' + newId, new FormControl(undefined, Validators.compose([
      Validators.required,
      Validators.pattern(/^([A-Za-z0-9+\-*/?<>%\s])+$/)
    ])));
    const newQuestion: QuestionInterface = {
      _questionId: newId,
      content: '',
      answerOptions: []
    }
    const answersCount: number = question?.answerOptions?.length ? question.answerOptions.length : 2;
    if (question) {
      this.quizForm.get('questionContent_' + newId)?.setValue(question.content);
      question.answerOptions?.forEach(answer => {
        this.addAnswer(newQuestion, answer);
      });
    } else {
      for (let i: number = 0; i < answersCount; i++) {
        this.addAnswer(newQuestion);
      }
    }
    this.quizForm.updateValueAndValidity();
    this.questionsList.push(newQuestion);
    this.cdr.detectChanges();
  }

  public addAnswer(question: QuestionInterface, answer?: AnswerDto): void {
    const lastAnswer: AnswerInterface = question.answerOptions[question.answerOptions.length - 1];
    const newId: number = lastAnswer?._answerId ? lastAnswer._answerId + 1 : 1;
    this.quizForm.addControl('answerContent_' + question._questionId + '_' + newId, new FormControl(undefined, Validators.compose([
      Validators.required,
      Validators.pattern(/^([A-Za-z0-9+\-*/?<>%\s])+$/)
    ])));
    if (answer) {
      this.quizForm.get('answerContent_' + question._questionId + '_' + newId)?.setValue(answer.content);
      if (answer.isCorrect) this.quizForm.get('correctAnswer_' + question._questionId)?.setValue(newId);
    }
    question.answerOptions.push({
      _answerId: newId,
      content: '',
      isCorrect: false,
    });
    this.cdr.detectChanges();
  }

  public getQuestionFormControlName(question: QuestionInterface): string {
    return 'questionContent_' + question._questionId;
  }

  public getAnswerFormControlName(question: QuestionInterface, answer: AnswerInterface): string {
    return 'answerContent_' + question._questionId + '_' + answer._answerId;
  }

  public saveQuiz(): void {
    const newQuiz: QuizInterface = {
      title: this.quizForm.get('title')?.value,
      frequencyInDays: this.quizForm.get('frequencyInDays')?.value,
      questions: []
    };
    if (this.quizForm.get('description')?.value) newQuiz.description = this.quizForm.get('description')?.value;
    this.questionsList.forEach((question: QuestionInterface) => {
      const newQuestion: QuestionInterface = {
        content: this.quizForm.get('questionContent_' + question._questionId)?.value,
        answerOptions: [],
      }
      question.answerOptions.forEach((answer: AnswerInterface) => {
        const newAnswer: AnswerInterface = {
          content: this.quizForm.get('answerContent_' + question._questionId + "_" + answer._answerId)?.value,
          isCorrect: this.quizForm.get('correctAnswer_' + question._questionId)?.value === answer._answerId
        }
        newQuestion.answerOptions.push(newAnswer);
      });
      newQuiz.questions.push(newQuestion);
    });
    this.dialogRef.close(newQuiz);
  }
}
