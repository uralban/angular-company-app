import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RolesListState} from './roles-list.state';

export const rolesListFeatureKey = 'rolesListData';

export const selectRolesListStore = createFeatureSelector<RolesListState>(rolesListFeatureKey);

export const selectRolesListData = createSelector(
  selectRolesListStore,
  (state: RolesListState) => state.rolesList,
);
