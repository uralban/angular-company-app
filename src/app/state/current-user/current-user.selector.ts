import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CurrentUserState} from './current-user.state';

export const currentUserFeatureKey = 'currentUserData';

export const selectCurrentUserStore = createFeatureSelector<CurrentUserState>(currentUserFeatureKey);

export const selectCurrentUserData = createSelector(
  selectCurrentUserStore,
  (state: CurrentUserState) => state.user,
);
