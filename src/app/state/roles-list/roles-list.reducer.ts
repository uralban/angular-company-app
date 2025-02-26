import {Action, createReducer, on} from '@ngrx/store';
import {initialState, RolesListState} from './roles-list.state';
import * as RolesListActions from './roles-list.actions';

const RolesListReducer = createReducer(
  initialState,
  on(RolesListActions.rolesListClear, (state, {}) => {
    return {
      ...state,
      rolesList: null,
    }
  }),
  on(RolesListActions.rolesListSuccess, (state, {rolesList}) => {
    return {
      ...state,
      rolesList,
    };
  }),
);

export function rolesListReducerFn(state: RolesListState | undefined, action: Action) {
  return RolesListReducer(state, action);
}
