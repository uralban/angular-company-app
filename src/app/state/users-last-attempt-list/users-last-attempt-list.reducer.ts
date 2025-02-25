import {Action, createReducer, on} from '@ngrx/store';
import {initialState, UsersLastAttemptListState} from '../users-last-attempt-list';
import * as UsersLastAttemptListDataActions from '../users-last-attempt-list/users-last-attempt-list.actions';

const UsersLastAttemptListDataReducer = createReducer(
  initialState,
  on(UsersLastAttemptListDataActions.usersLastAttemptListDataClear, (state, {}) => {
    return {
      ...state,
      usersLastAttemptListData: null,
    }
  }),
  on(UsersLastAttemptListDataActions.usersLastAttemptListDataSuccess, (state, {usersLastAttemptListData}) => {
    return {
      ...state,
      usersLastAttemptListData,
    };
  }),
);

export function usersLastAttemptListReducerFn(state: UsersLastAttemptListState | undefined, action: Action) {
  return UsersLastAttemptListDataReducer(state, action);
}
