import {RoleDto} from '../../interfaces/role/role.dto';

export interface RolesListState {
  rolesList: RoleDto[] | null;
}

export const initialState: RolesListState = {
  rolesList: null,
};
