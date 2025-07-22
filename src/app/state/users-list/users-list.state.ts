import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {UserDto} from '../../interfaces/user/user.dto';

export interface UsersListState {
  usersListData: PaginatedListDataInterface<UserDto> | null;
}

export const initialState: UsersListState = {
  usersListData: null,
};
