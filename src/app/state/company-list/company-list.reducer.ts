import {Action, createReducer, on} from '@ngrx/store';
import {initialState, CompanyListState} from '../company-list';
import * as CompanyListDataActions from '../company-list/company-list.actions';

const CompanyListDataReducer = createReducer(
  initialState,
  on(CompanyListDataActions.companyListDataClear, (state, {}) => {
    return {
      ...state,
      usersListData: null,
    }
  }),
  on(CompanyListDataActions.companyListDataSuccess, (state, {companyListData}) => {
    return {
      ...state,
      companyListData,
    };
  }),
);

export function companyListReducerFn(state: CompanyListState | undefined, action: Action) {
  return CompanyListDataReducer(state, action);
}
