import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PaginationMetaDto} from '../../../../interfaces/pagination/pagination-meta.dto';
import {Subject, takeUntil} from 'rxjs';
import {QuizDto} from '../../../../interfaces/quiz/quiz.dto';
import {PowerSpinnerService} from '../../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {PageEvent} from '@angular/material/paginator';
import {PaginationDto} from '../../../../interfaces/pagination/pagination.dto';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {quizListDataSuccess} from '../../../../state/quiz-list';
import {MatDialog} from '@angular/material/dialog';
import {UniversalModalComponent} from '../../../../widgets/universal-modal/universal-modal.component';
import {QuizModalComponent} from './quiz-modal/quiz-modal.component';
import {QuizInterface} from '../../../../interfaces/quiz/quiz.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'quizzes',
  standalone: false,
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent implements OnInit, OnDestroy {
  @Input() isAdmin!: boolean;
  @Input() companyId!: string | undefined;

  private readonly dialog: MatDialog = inject(MatDialog);
  public paginationMeta: PaginationMetaDto = new PaginationMetaDto(1, 3);
  public paginatedQuizzesList: QuizDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private store$: Store,
    private quizService: QuizService,
    private router: Router,
    ) {
  }

  public ngOnInit(): void {
    this.getQuizListStoreSubscribe();
    this.needReloadQuizListDataSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public createNewQuiz(): void {
    const dialogRef = this.dialog.open(QuizModalComponent, {
      data: {
        title: 'Create Quiz',
      },
      width: '1000px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(newQuiz => {
      if (newQuiz) {
        this.saveQuiz(newQuiz);
      }
    });
  }

  public saveQuiz(newQuiz: QuizInterface): void {
    if (this.companyId) {
      this.spinner.show();
      this.quizService.createNewQuiz(this.companyId, newQuiz).then(result => {
        this.toastrService.success(result.message);
        this.quizService.needReloadQuizListData$.next(true);
      });
    }
  }

  public onPageChange(event: PageEvent): void {
    this.paginationMeta.page = event.pageIndex + 1;
    this.paginationMeta.take = event.pageSize;
    this.updatePaginateQuizzesList();
  }

  private updatePaginateQuizzesList(): void {
    if (this.companyId) {
      this.spinner.show();
      this.quizService.getAllQuizzes(this.companyId, {
        page: this.paginationMeta.page,
        take: this.paginationMeta.take,
      }).then((paginationDto: PaginationDto<QuizDto>): void => {
        this.store$.dispatch(quizListDataSuccess({quizListData: paginationDto}));
        this.quizService.needReloadQuizListData$.next(false);
      }).finally(() => this.spinner.hide());
    }
  }

  private getQuizListStoreSubscribe(): void {
    this.quizService.storedQuizListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(quizListData => {
      if (quizListData) {
        this.paginatedQuizzesList = quizListData.data;
        this.paginationMeta.itemCount = quizListData.meta.itemCount;
        this.paginationMeta.take = quizListData.meta.take;
        this.paginationMeta.page = quizListData.meta.page;
      }
    });
  }

  private needReloadQuizListDataSubscribe(): void {
    this.quizService.needReloadQuizListData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) this.updatePaginateQuizzesList();
    });
  }

  public startQuiz(quiz: QuizDto): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Start Quiz',
        message: 'Are you sure you want to start quiz ' + quiz.title + '?'
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.quizService.singleQuizId$.next(quiz.id);
        this.router.navigate(['companies/quiz-workflow']);
      }
    });
  }

}
