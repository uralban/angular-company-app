import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';

export const selectGlobalLoader = createFeatureSelector<CoreState>("coreData");

export const selectAuthUser = createSelector(
  selectGlobalLoader,
  (state: CoreState) => state.authUserData,
);
