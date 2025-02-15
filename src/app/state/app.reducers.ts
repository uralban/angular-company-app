import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {State} from './app.state';
import * as CoreReducer from "./core/core.reducer";
import * as UsersListDataReducer from "./users-list/users-list.reducer";
import * as CurrentUserReducer from "./current-user/current-user.reducer";
import * as RolesListReducer from "./roles-list/roles-list.reducer";
import * as VisibilityReducer from "./visibility-list/visibility-list.reducer";
import * as CompanyReducer from "./company-list/company-list.reducer";
import * as CurrentCompanyReducer from "./current-company/current-company.reducer";

export const reducers: ActionReducerMap<State> = {
  coreData: CoreReducer.coreReducerFn,
  usersListData: UsersListDataReducer.usersListReducerFn,
  user: CurrentUserReducer.currentUserReducerFn,
  rolesList: RolesListReducer.rolesListReducerFn,
  visibilityList: VisibilityReducer.visibilityReducerFn,
  companyList: CompanyReducer.companyListReducerFn,
  company: CurrentCompanyReducer.currentCompanyReducerFn,
};

export const metaReducers: MetaReducer<State>[] = [];
