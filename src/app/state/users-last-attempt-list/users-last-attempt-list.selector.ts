import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersLastAttemptListState} from './users-last-attempt-list.state';

export const usersLastAttemptListDataFeatureKey = 'usersLastAttemptListData';

export const selectUsersLastAttemptListStore = createFeatureSelector<UsersLastAttemptListState>(usersLastAttemptListDataFeatureKey);

export const selectUsersLastAttemptListData = createSelector(
  selectUsersLastAttemptListStore,
  (state: UsersLastAttemptListState) => state.usersLastAttemptListData,
);
