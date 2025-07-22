import {UsersLastAttemptListDto} from '../../interfaces/user/users-last-attempt-list.dto';

export interface UsersLastAttemptListState {
  usersLastAttemptListData: UsersLastAttemptListDto[] | null;
}

export const initialState: UsersLastAttemptListState = {
  usersLastAttemptListData: null,
};
