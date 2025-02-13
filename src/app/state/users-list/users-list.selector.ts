import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersListState} from './users-list.state';

export const usersListDataFeatureKey = 'usersListData';

export const selectUsersListStore = createFeatureSelector<UsersListState>(usersListDataFeatureKey);

export const selectUsersListData = createSelector(
  selectUsersListStore,
  (state: UsersListState) => state.usersListData,
);
