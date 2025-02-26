import {createAction, props} from '@ngrx/store';

export const visibilityListSuccess = createAction(
  "[Visibility List State] Visibility list data success",
  props<{ visibilityList: string[] }>()
);

export const visibilityListClear = createAction(
  "[Visibility List State] Visibility list data clear",
);
