import {UserDto} from '../../interfaces/user-dto';

export interface CoreState {
  authUserData: UserDto | null;
  loaded: boolean;
}

export const initialState: CoreState = {
  authUserData: null,
  loaded: false,
};
