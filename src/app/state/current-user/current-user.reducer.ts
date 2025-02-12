import {Action, createReducer, on} from '@ngrx/store';
import {CurrentUserState, initialState} from './current-user.state';
import * as CurrentUserActions from './current-user.actions';

const CurrentUserReducer = createReducer(
  initialState,
  on(CurrentUserActions.currentUserClear, (state, {}) => {
    return {
      ...state,
      user: null,
    }
  }),
  on(CurrentUserActions.currentUserSuccess, (state, {user}) => {
    return {
      ...state,
      user,
    };
  }),
);

export function currentUserReducerFn(state: CurrentUserState | undefined, action: Action) {
  return CurrentUserReducer(state, action);
}
