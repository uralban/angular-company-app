import {PaginatedListDataInterface} from '../../interfaces/paginated-list-data.interface';
import {UserDto} from '../../interfaces/user-dto';

export interface UsersListState {
  usersListData: PaginatedListDataInterface<UserDto> | null;
}

export const initialState: UsersListState = {
  usersListData: null,
};
