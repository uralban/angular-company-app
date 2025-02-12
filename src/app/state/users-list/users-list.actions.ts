import {createAction, props} from '@ngrx/store';
import {UsersListDataInterface} from '../../interfaces/users-list-data.interface';

export const usersListDataSuccess = createAction(
  "[Users List State] Users list data success",
  props<{usersListData: UsersListDataInterface}>()
);

export const usersListDataClear = createAction(
  "[Users List State] Users list user data clear",
);
