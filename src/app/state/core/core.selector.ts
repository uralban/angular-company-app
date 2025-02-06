import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';

export const coreDataFeatureKey = 'coreData';

export const selectGlobalLoader = createFeatureSelector<CoreState>(coreDataFeatureKey);

export const selectAuthUser = createSelector(
  selectGlobalLoader,
  (state: CoreState) => state.authUserData,
);
