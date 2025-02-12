import {UserDto} from '../../interfaces/user-dto';

export interface CurrentUserState {
  user: UserDto | null;
}

export const initialState: CurrentUserState = {
  user: null,
};
