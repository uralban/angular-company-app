import {UsersListDataInterface} from '../../interfaces/users-list-data.interface';

export interface UsersListState {
  usersListData: UsersListDataInterface | null;
}

export const initialState: UsersListState = {
  usersListData: null,
};
