import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {BehaviorSubject, lastValueFrom, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {QuizDto} from '../../interfaces/quiz/quiz.dto';
import {selectQuizListData} from '../../state/quiz-list/quiz-list.selector';
import {PaginationRequestInterface} from '../../interfaces/pagination/pagination-request.interface';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {ResultMessageDto} from '../../interfaces/result-message.dto';
import {QuizInterface} from '../../interfaces/quiz/quiz.interface';
import {selectCurrentQuizData} from '../../state/current-quiz';
import {QuizAttemptDto} from '../../interfaces/quiz/quiz-attempt.dto';
import {QuizStartResultDto} from '../../interfaces/quiz/quiz-start-result.dto';
import {FormatEnum} from '../../consts/format.enum';
import {ExportAttemptOptions} from '../../interfaces/quiz/export-attempt-options.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends HttpService {

  private readonly URL_QUIZ: string;
  private readonly URL_QUIZ_ATTEMPT: string;

  public storedQuizListData$: Observable<PaginatedListDataInterface<QuizDto> | null>;
  public needReloadQuizListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public singleQuizId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public storedCurrentQuizData$: Observable<QuizDto | null>;

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
  ) {
    super(httpClients);
    this.URL_QUIZ = environment.apiUrl + '/quizzes';
    this.URL_QUIZ_ATTEMPT = environment.apiUrl + '/quiz-attempt';
    this.storedQuizListData$ = this.store$.pipe(select(selectQuizListData));
    this.storedCurrentQuizData$ = this.store$.pipe(select(selectCurrentQuizData));
  }

  public async getAllQuizzes(companyId: string, paginationRequest: PaginationRequestInterface): Promise<PaginationDto<QuizDto>> {
    return lastValueFrom(super.getDataWithPagination(
      this.URL_QUIZ + '/company/' + companyId,
      (data) => new PaginationDto<QuizDto>(QuizDto, data),
      JSON.parse(JSON.stringify(paginationRequest))));
  }

  public async deleteQuiz(quizId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_QUIZ + '/' + quizId, ResultMessageDto));
  }

  public async createNewQuiz(companyId: string, newQuiz: QuizInterface): Promise<ResultMessageDto> {
    return lastValueFrom(super.postForResult(this.URL_QUIZ + '/' + companyId, ResultMessageDto, {}, newQuiz));
  }

  public async updateQuiz(quizId: string, quiz: QuizInterface): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_QUIZ + '/' + quizId, ResultMessageDto, {}, quiz));
  }

  public async getQuizById(quizId: string): Promise<QuizDto> {
    return lastValueFrom(super.getOne(this.URL_QUIZ + '/' + quizId, QuizDto, {}));
  }

  public async getQuizByIdForStart(quizId: string): Promise<QuizStartResultDto> {
    return lastValueFrom(super.getOne(this.URL_QUIZ + '/start/' + quizId, QuizStartResultDto, {}));
  }

  public async createNewAttempt(newQuizAttempt: QuizAttemptDto): Promise<ResultMessageDto> {
    return lastValueFrom(super.postForResult(this.URL_QUIZ_ATTEMPT, ResultMessageDto, {}, newQuizAttempt));
  }

  public async getUserTotalScore(): Promise<ResultMessageDto> {
    return lastValueFrom(super.getOne(this.URL_QUIZ_ATTEMPT + '/total-score', ResultMessageDto));
  }

  public getUserReport(format: FormatEnum): Observable<{ blob: Blob; filename: string }> {
    return super.getFile(this.URL_QUIZ_ATTEMPT + '/export/user/' + format).pipe(
      map(response => {
        const contentDisposition: string = response.headers.get('Content-Disposition') || '';
        const matches = /filename="([^"]+)"/.exec(contentDisposition);
        const filename: string = matches && matches[1] ? matches[1] : 'user_quiz_attempts.csv';
        return {blob: response.body as Blob, filename};
      })
    );
  }

  public getCompanyReport(format: FormatEnum, exportAttemptOptions: ExportAttemptOptions): Observable<{
    blob: Blob;
    filename: string
  }> {
    return super.getFile(this.URL_QUIZ_ATTEMPT + '/export/company/' + format, {...exportAttemptOptions}).pipe(
      map(response => {
        const contentDisposition: string = response.headers.get('Content-Disposition') || '';
        const matches = /filename="([^"]+)"/.exec(contentDisposition);
        const filename: string = matches && matches[1] ? matches[1] : 'company_report.csv';
        return {blob: response.body as Blob, filename};
      })
    );
  }
}
