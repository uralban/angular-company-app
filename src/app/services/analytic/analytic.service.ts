import { Injectable } from '@angular/core';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {UserWithScoresDto} from '../../interfaces/quiz/user-with-scores.dto';
import {UsersLastAttemptListDto} from '../../interfaces/user/users-last-attempt-list.dto';
import {QuizScoreDto} from '../../interfaces/quiz/quiz-score.dto';
import {QuizWithLastDateDto} from '../../interfaces/quiz/quiz-with-last-date.dto';
import {QuizWithScoresDto} from '../../interfaces/quiz/quiz-with-scores.dto';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService extends HttpService {

  private readonly URL_COMPANY_ANALYTIC: string;
  private readonly URL_USER_ANALYTIC: string;

  constructor(
    protected httpClients: HttpClient,
    ) {
    super(httpClients);

    this.URL_COMPANY_ANALYTIC = environment.apiUrl + '/analytics/company';
    this.URL_USER_ANALYTIC = environment.apiUrl + '/analytics/user';
  }

  public async getAllUserScoreInCompany(companyId: string): Promise<UserWithScoresDto[]> {
    return lastValueFrom(super.getAll(this.URL_COMPANY_ANALYTIC + '/quiz-scores/' + companyId, UserWithScoresDto));
  }

  public async getUsersLastAttemptList(companyId: string): Promise<UsersLastAttemptListDto[]> {
    return lastValueFrom(super.getAll(this.URL_COMPANY_ANALYTIC + '/users-last-attempts/' + companyId, UsersLastAttemptListDto));
  }

  public async getUserQuizCompanyScore(companyId: string): Promise<QuizScoreDto> {
    return lastValueFrom(super.getOne(this.URL_USER_ANALYTIC + '/company-score/' + companyId, QuizScoreDto));
  }

  public async getUsersQuizWithTimeList(): Promise<QuizWithLastDateDto[]> {
    return lastValueFrom(super.getAll(this.URL_USER_ANALYTIC + '/quiz-with-time', QuizWithLastDateDto));
  }

  public async getUsersQuizScoreList(): Promise<QuizWithScoresDto[]> {
    return lastValueFrom(super.getAll(this.URL_USER_ANALYTIC + '/quiz-scores', QuizWithScoresDto));
  }

}
