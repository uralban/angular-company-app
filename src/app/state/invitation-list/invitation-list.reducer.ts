import {Action, createReducer, on} from '@ngrx/store';
import * as InvitationListDataActions from '../invitation-list/invitation-list.actions';
import {InvitationListState, initialState} from './invitation-list.state';

const InvitationListDataReducer = createReducer(
  initialState,
  on(InvitationListDataActions.invitationListDataClear, (state, {}) => {
    return {
      ...state,
      invitationListData: null,
    }
  }),
  on(InvitationListDataActions.invitationListDataSuccess, (state, {invitationListData}) => {
    return {
      ...state,
      invitationListData,
    };
  }),
);

export function invitationListReducerFn(state: InvitationListState | undefined, action: Action) {
  return InvitationListDataReducer(state, action);
}
