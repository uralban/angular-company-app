import {createAction, props} from '@ngrx/store';
import {RoleDto} from '../../interfaces/role-dto';

export const rolesListSuccess = createAction(
  "[Roles List State] Roles list data success",
  props<{rolesList: RoleDto[]}>()
);

export const rolesListClear = createAction(
  "[Roles List State] Roles list data clear",
);
