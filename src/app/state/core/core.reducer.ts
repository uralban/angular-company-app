import {Action, createReducer, on} from '@ngrx/store';
import {CoreState, initialState} from './core.state';
import * as GlobalLoaderActions from './core.actions';

const CoreReducer = createReducer(
  initialState,
  on(GlobalLoaderActions.authUserDataClear, (state, {}) => {
    return {
      ...state,
      authUserData: null,
      loaded: true,
    }
  }),
  on(GlobalLoaderActions.authUserDataSuccess, (state, {authUserData}) => {
    return {
      ...state,
      authUserData,
      loaded: true,
    };
  }),
);

export function coreReducerFn(state: CoreState | undefined, action: Action) {
  return CoreReducer(state, action);
}
