import {Action, createReducer, on} from '@ngrx/store';
import {initialState, VisibilityListState} from '../visibility-list';
import * as VisibilityListActions from '../visibility-list/visibility-list.actions';

const VisibilityListReducer = createReducer(
  initialState,
  on(VisibilityListActions.visibilityListClear, (state, {}) => {
    return {
      ...state,
      visibilityList: null,
    }
  }),
  on(VisibilityListActions.visibilityListSuccess, (state, {visibilityList}) => {
    return {
      ...state,
      visibilityList,
    };
  }),
);

export function visibilityReducerFn(state: VisibilityListState | undefined, action: Action) {
  return VisibilityListReducer(state, action);
}
