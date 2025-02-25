import {createAction, props} from '@ngrx/store';
import {UsersLastAttemptListDto} from '../../interfaces/user/users-last-attempt-list.dto';

export const usersLastAttemptListDataSuccess = createAction(
  "[Users Last Attempt List State] Users last attempt list data success",
  props<{usersLastAttemptListData: UsersLastAttemptListDto[]}>()
);

export const usersLastAttemptListDataClear = createAction(
  "[Users Last Attempt List State] Users last attempt list user data clear",
);
