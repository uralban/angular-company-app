import {Action, createReducer, on} from '@ngrx/store';
import {initialState, UsersListState} from './users-list.state';
import * as UsersListDataActions from './users-list.actions';

const UsersListDataReducer = createReducer(
  initialState,
  on(UsersListDataActions.usersListDataClear, (state, {}) => {
    return {
      ...state,
      usersListData: null,
    }
  }),
  on(UsersListDataActions.usersListDataSuccess, (state, {usersListData}) => {
    return {
      ...state,
      usersListData,
    };
  }),
);

export function usersListReducerFn(state: UsersListState | undefined, action: Action) {
  return UsersListDataReducer(state, action);
}
