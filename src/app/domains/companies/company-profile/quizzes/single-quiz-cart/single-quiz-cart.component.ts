import {Component, inject, Input, OnDestroy} from '@angular/core';
import {QuizDto} from '../../../../../interfaces/quiz/quiz.dto';
import {MatDialog} from '@angular/material/dialog';
import {Subject, takeUntil} from 'rxjs';
import {UniversalModalComponent} from '../../../../../widgets/universal-modal/universal-modal.component';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {QuizService} from '../../../../../services/quiz/quiz.service';
import {QuizModalComponent} from '../quiz-modal/quiz-modal.component';
import {QuizInterface} from '../../../../../interfaces/quiz/quiz.interface';
import {Store} from '@ngrx/store';
import {currentQuizClear} from '../../../../../state/current-quiz';
import {FormatEnum} from '../../../../../consts/format.enum';

@Component({
  selector: 'single-quiz-cart',
  standalone: false,
  templateUrl: './single-quiz-cart.component.html'
})
export class SingleQuizCartComponent implements OnDestroy {
  @Input() quiz!: QuizDto;
  @Input() isAdmin!: boolean;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private quizService: QuizService,
    private store$: Store,
  ) {
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public deleteQuizConfirm(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Delete Quiz',
        message: 'Confirm to delete quiz ' + this.quiz.title,
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.deleteQuiz();
      }
    });
  }

  public deleteQuiz(): void {
    if (this.quiz.id) {
      this.spinner.show();
      this.quizService.deleteQuiz(this.quiz.id).then(result => {
        this.toastrService.success(result.message);
        this.quizService.needReloadQuizListData$.next(true);
      }).finally(() => this.spinner.hide());
    }
  }

  public updateQuiz(editedQuiz: QuizInterface): void {
    if (this.quiz.id) {
      this.spinner.show();
      this.quizService.updateQuiz(this.quiz.id, editedQuiz).then(result => {
        this.toastrService.success(result.message);
        this.store$.dispatch(currentQuizClear());
        this.quizService.needReloadQuizListData$.next(true);
      }).finally(() => this.spinner.hide());
    }
  }

  public editQuiz(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(QuizModalComponent, {
      data: {
        title: 'Edit Quiz',
        quizId: this.quiz.id,
      },
      width: '1000px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(editedQuiz => {
      if (editedQuiz) {
        this.updateQuiz(editedQuiz);
      }
    });
  }

  public getCompanyQuizReport(event: Event): void {
    event.stopPropagation();
    if (this.quiz.company?.id) {
      this.spinner.show();
      this.quizService
        .getCompanyReport(FormatEnum.CSV, {
          companyId: this.quiz.company.id,
          quizId: this.quiz.id,
        })
        .subscribe({
          next: (response: { blob: Blob; filename: string }) => {
            const blobUrl: string = URL.createObjectURL(response.blob);
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = blobUrl;
            a.download = response.filename || 'company_quiz_report.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          },
          complete: () => this.spinner.hide()
        });
    }
  }
}
