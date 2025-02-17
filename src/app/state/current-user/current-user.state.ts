import {UserDto} from '../../interfaces/user/user.dto';

export interface CurrentUserState {
  user: UserDto | null;
}

export const initialState: CurrentUserState = {
  user: null,
};
