import {createAction, props} from '@ngrx/store';
import {UserDto} from '../../interfaces/user/user.dto';

export const authUserDataSuccess = createAction(
  "[Core State] Auth user data success",
  props<{authUserData: UserDto}>()
);

export const authUserDataClear = createAction(
  "[Core State] Auth user data clear",
);
