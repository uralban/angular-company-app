import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CurrentCompanyState} from '../current-company';

export const currentCompanyFeatureKey = 'currentCompanyData';

export const selectCurrentCompanyStore = createFeatureSelector<CurrentCompanyState>(currentCompanyFeatureKey);

export const selectCurrentCompanyData = createSelector(
  selectCurrentCompanyStore,
  (state: CurrentCompanyState) => state.company,
);
