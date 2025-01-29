import {UserDto} from '../../interfaces/user-dto';

export interface CoreState {
  authUserData: UserDto | null;
}

export const initialState: CoreState = {
  authUserData: null,
};
