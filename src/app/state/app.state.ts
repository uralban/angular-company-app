import {CoreState} from './core';
import {UsersListState} from './users-list';
import {CurrentUserState} from './current-user';
import {RolesListState} from './roles-list';
import {VisibilityListState} from './visibility-list';
import {CompanyListState} from './company-list';
import {CurrentCompanyState} from './current-company';

export interface State {
  coreData: CoreState;
  usersListData: UsersListState,
  user: CurrentUserState,
  rolesList: RolesListState,
  visibilityList: VisibilityListState,
  companyList: CompanyListState,
  company: CurrentCompanyState,
}
