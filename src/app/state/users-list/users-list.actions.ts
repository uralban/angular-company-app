import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {UserDto} from '../../interfaces/user/user.dto';

export const usersListDataSuccess = createAction(
  "[Users List State] Users list data success",
  props<{usersListData: PaginatedListDataInterface<UserDto>}>()
);

export const usersListDataClear = createAction(
  "[Users List State] Users list user data clear",
);
