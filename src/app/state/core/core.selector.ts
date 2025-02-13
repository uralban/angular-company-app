import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';

export const coreDataFeatureKey = 'coreData';

export const selectCoreStore = createFeatureSelector<CoreState>(coreDataFeatureKey);

export const selectAuthUser = createSelector(
  selectCoreStore,
  (state: CoreState) => state.authUserData,
);

export const selectIsAuthLoaded = createSelector(
  selectCoreStore,
  (state: CoreState) => state.loaded,
);
