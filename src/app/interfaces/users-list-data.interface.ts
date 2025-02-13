import {UserDto} from './user-dto';
import {PaginationMetaDto} from './pagination-meta-dto';

export interface UsersListDataInterface {
  data: UserDto[],
  meta: PaginationMetaDto
}
