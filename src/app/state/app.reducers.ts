import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {State} from './app.state';
import * as CoreReducer from "./core/core.reducer";
import * as UsersListDataReducer from "./users-list/users-list.reducer";
import * as CurrentUserReducer from "./current-user/current-user.reducer";
import * as RolesListReducer from "./roles-list/roles-list.reducer";

export const reducers: ActionReducerMap<State> = {
  coreData: CoreReducer.coreReducerFn,
  usersListData: UsersListDataReducer.usersListReducerFn,
  user: CurrentUserReducer.currentUserReducerFn,
  rolesList: RolesListReducer.rolesListReducerFn,
};

export const metaReducers: MetaReducer<State>[] = [];
