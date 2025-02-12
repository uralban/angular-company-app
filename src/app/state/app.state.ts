import {CoreState} from './core';
import {UsersListState} from './users-list';
import {CurrentUserState} from './current-user';
import {RolesListState} from './roles-list';

export interface State {
  coreData: CoreState;
  usersListData: UsersListState,
  user: CurrentUserState,
  rolesList: RolesListState,
}
