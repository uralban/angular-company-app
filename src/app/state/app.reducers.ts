import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {State} from './app.state';
import * as CoreReducer from "./core/core.reducer";
import * as UsersListDataReducer from "./users-list/users-list.reducer";
import * as CurrentUserReducer from "./current-user/current-user.reducer";
import * as RolesListReducer from "./roles-list/roles-list.reducer";
import * as VisibilityReducer from "./visibility-list/visibility-list.reducer";
import * as CompanyReducer from "./company-list/company-list.reducer";
import * as CurrentCompanyReducer from "./current-company/current-company.reducer";
import * as InvitationReducer from "./invitation-list/invitation-list.reducer";
import * as RequestReducer from "./request-list/request-list.reducer";
import * as QuizReducer from "./quiz-list/quiz-list.reducer";
import * as CurrentQuizReducer from "./current-quiz/current-quiz.reducer";

export const reducers: ActionReducerMap<State> = {
  coreData: CoreReducer.coreReducerFn,
  usersListData: UsersListDataReducer.usersListReducerFn,
  user: CurrentUserReducer.currentUserReducerFn,
  rolesList: RolesListReducer.rolesListReducerFn,
  visibilityList: VisibilityReducer.visibilityReducerFn,
  companyListData: CompanyReducer.companyListReducerFn,
  company: CurrentCompanyReducer.currentCompanyReducerFn,
  invitationListData: InvitationReducer.invitationListReducerFn,
  requestListData: RequestReducer.requestListReducerFn,
  quizListData: QuizReducer.quizListReducerFn,
  quiz: CurrentQuizReducer.currentQuizReducerFn,
};

export const metaReducers: MetaReducer<State>[] = [];
