import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RequestListState} from './request-list.state';

export const requestListFeatureKey = 'requestListData';

export const selectRequestListStore = createFeatureSelector<RequestListState>(requestListFeatureKey);

export const selectRequestListData = createSelector(
  selectRequestListStore,
  (state: RequestListState) => state.requestListData,
);
