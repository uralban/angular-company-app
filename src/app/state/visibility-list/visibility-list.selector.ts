import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VisibilityListState} from './visibility-list.state';

export const visibilityListFeatureKey = 'visibilityListData';

export const selectVisibilityListStore = createFeatureSelector<VisibilityListState>(visibilityListFeatureKey);

export const selectVisibilityListData = createSelector(
  selectVisibilityListStore,
  (state: VisibilityListState) => state.visibilityList,
);
