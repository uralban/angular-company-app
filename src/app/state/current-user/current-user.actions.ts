import {createAction, props} from '@ngrx/store';
import {UserDto} from '../../interfaces/user/user.dto';

export const currentUserSuccess = createAction(
  "[Current User State] Current user data success",
  props<{ user: UserDto }>()
);

export const currentUserClear = createAction(
  "[Current User State] Current user data clear",
);
