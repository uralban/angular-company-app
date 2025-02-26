import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from '../../../services/quiz/quiz.service';
import {Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {QuizDto} from '../../../interfaces/quiz/quiz.dto';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {currentQuizClear, currentQuizSuccess} from '../../../state/current-quiz';
import {MatDialog} from '@angular/material/dialog';
import {UniversalModalComponent} from '../../../widgets/universal-modal/universal-modal.component';
import {QuizAttemptDto} from '../../../interfaces/quiz/quiz-attempt.dto';
import {ToastrService} from 'ngx-toastr';
import {ResultMessageDto} from '../../../interfaces/result-message.dto';
import {QuestionAttemptAnswerDto} from '../../../interfaces/quiz/question-attempt-answer.dto';
import {MemberService} from '../../../services/member/member.service';

@Component({
  selector: 'app-quiz-workflow',
  standalone: false,
  templateUrl: './quiz-workflow.component.html'
})
export class QuizWorkflowComponent implements OnInit, OnDestroy {

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);
  public quiz: QuizDto | null = null;
  public questionWithAnswersList: QuestionAttemptAnswerDto[] = [];
  private quizAttemptComplete: boolean = false;

  constructor(
    private quizService: QuizService,
    private memberService: MemberService,
    private router: Router,
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.checkQuizIdAndUpdateCurrentQuizStore();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.quizService.singleQuizId$.next(undefined);
    if (this.quizAttemptComplete) {
      this.store$.dispatch(currentQuizClear());
    }
  }

  public checkQuizIdAndUpdateCurrentQuizStore(): void {
    this.quizService.singleQuizId$.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/companies/company-profile']);
      } else {
        this.subscribeToQuizUpdates(id);
      }
    });
  }

  private subscribeToQuizUpdates(id: string): void {
    this.quizService.storedCurrentQuizData$.pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(quiz => {
      if (quiz && quiz.id === id) {
        this.quiz = quiz;
      } else {
        this.getQuizByIdForStart(id);
      }
    });
  }

  private getQuizByIdForStart(id: string): void {
    this.spinner.show();
    this.quizService.getQuizByIdForStart(id).then(result => {
      if (result.message) {
        this.toastrService.warning(result.message);
        this.quizService.singleQuizId$.next(undefined);
        this.router.navigate(['/companies/company-profile']);
      } else if (result.quiz) {
        this.toastrService.info('Starting Quiz ' + result.quiz.title);
        this.store$.dispatch(currentQuizSuccess({quiz: result.quiz}));
      }
    }).finally(() => this.spinner.hide());
  }

  public answersChangeHandler(changedQuestion: QuestionAttemptAnswerDto): void {
    const changedQuestionIndex: number = this.questionWithAnswersList.findIndex(question => question.questionId === changedQuestion.questionId);
    if (changedQuestionIndex === -1) {
      this.questionWithAnswersList.push(changedQuestion);
      return;
    }
    if (!changedQuestion.answersIdList?.length) {
      this.questionWithAnswersList.splice(changedQuestionIndex, 1);
      return;
    }
    this.questionWithAnswersList[changedQuestionIndex].answersIdList = changedQuestion.answersIdList;
  }

  public saveAttempt(): void {
    if (this.questionWithAnswersList.length !== this.quiz?.questions?.length) {
      this.toastrService.warning('You should to answer for all questions');
      return;
    }
    const newQuizAttempt: QuizAttemptDto = new QuizAttemptDto();
    newQuizAttempt.quizId = this.quiz?.id;
    newQuizAttempt.questions = this.questionWithAnswersList;
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Save attempt',
        message: 'Are you sure you want to save attempt?',
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.spinner.show();
        this.quizService.createNewAttempt(newQuizAttempt).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.quizService.singleQuizId$.next(undefined);
          this.quizAttemptComplete = true;
          this.memberService.needReloadUsersLastAttemptListData$.next(true);
          this.router.navigate(['/companies/company-profile']);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public back(): void {
    this.quizService.singleQuizId$.next(undefined);
    this.router.navigate(['/companies/company-profile']);
  }
}
