import {Action, createReducer, on} from '@ngrx/store';
import {initialState, RequestListState} from '../request-list';
import * as RequestListDataActions from '../request-list/request-list.actions';

const RequestListDataReducer = createReducer(
  initialState,
  on(RequestListDataActions.requestListDataClear, (state, {}) => {
    return {
      ...state,
      requestListData: null,
    }
  }),
  on(RequestListDataActions.requestListDataSuccess, (state, {requestListData}) => {
    return {
      ...state,
      requestListData,
    };
  }),
);

export function requestListReducerFn(state: RequestListState | undefined, action: Action) {
  return RequestListDataReducer(state, action);
}
