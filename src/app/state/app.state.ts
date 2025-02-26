import {CoreState} from './core';
import {UsersListState} from './users-list';
import {CurrentUserState} from './current-user';
import {RolesListState} from './roles-list';
import {VisibilityListState} from './visibility-list';
import {CompanyListState} from './company-list';
import {CurrentCompanyState} from './current-company';
import {InvitationListState} from './invitation-list';
import {RequestListState} from './request-list';
import {QuizListState} from './quiz-list';
import {CurrentQuizState} from './current-quiz';
import {UsersLastAttemptListState} from './users-last-attempt-list';

export interface State {
  coreData: CoreState;
  usersListData: UsersListState,
  usersLastAttemptListData: UsersLastAttemptListState,
  user: CurrentUserState,
  rolesList: RolesListState,
  visibilityList: VisibilityListState,
  companyListData: CompanyListState,
  company: CurrentCompanyState,
  invitationListData: InvitationListState,
  requestListData: RequestListState,
  quizListData: QuizListState,
  quiz: CurrentQuizState,
}
