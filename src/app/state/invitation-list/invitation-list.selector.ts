import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InvitationListState} from './invitation-list.state';

export const invitationListFeatureKey = 'invitationListData';

export const selectInvitationListStore = createFeatureSelector<InvitationListState>(invitationListFeatureKey);

export const selectInvitationListData = createSelector(
  selectInvitationListStore,
  (state: InvitationListState) => state.invitationListData,
);
