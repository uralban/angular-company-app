import { Injectable } from '@angular/core';
import {HttpService} from '../http.service';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class QuizService extends HttpService {

  private readonly URL_QUIZ: string;

  public storedQuizListData$: Observable<PaginatedListDataInterface<QuizDto> | null>;
  public needReloadQuizListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
    ) {
    super(httpClients);
    this.URL_QUIZ = environment.apiUrl + '/quizzes';

    this.storedQuizListData$ = this.store$.pipe(select(selectQuizListData));
  }

  public async getAllQuizzes(companyId:string, paginationRequest: PaginationRequestInterface): Promise<PaginationDto<QuizDto>> {
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
}
