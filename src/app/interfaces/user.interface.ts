import {RoleDto} from './role-dto';

export interface User {
  id?: string,
  emailLogin?: string,
  firstName?: string,
  lastName?: string,
  password?: string,
  role?: RoleDto,
  avatarUrl?: string,
}
