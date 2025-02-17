import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CompanyListState} from './company-list.state';

export const companyListFeatureKey = 'companyListData';

export const selectCompanyListStore = createFeatureSelector<CompanyListState>(companyListFeatureKey);

export const selectCompanyListData = createSelector(
  selectCompanyListStore,
  (state: CompanyListState) => state.companyListData,
);
