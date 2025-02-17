import {Action, createReducer, on} from '@ngrx/store';
import {CurrentCompanyState, initialState} from './current-company.state';
import * as CurrentCompanyActions from './current-company.actions';

const CurrentCompanyReducer = createReducer(
  initialState,
  on(CurrentCompanyActions.currentCompanyClear, (state, {}) => {
    return {
      ...state,
      company: null,
    }
  }),
  on(CurrentCompanyActions.currentCompanySuccess, (state, {company}) => {
    return {
      ...state,
      company,
    };
  }),
);

export function currentCompanyReducerFn(state: CurrentCompanyState | undefined, action: Action) {
  return CurrentCompanyReducer(state, action);
}
