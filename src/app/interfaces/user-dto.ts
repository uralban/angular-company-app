import {DTO} from './dto.interface';
import {ObjectFiller} from '../helpers/object-filter';
import {RoleDto} from './role-dto';

export class UserDto implements DTO {

  constructor(
    public id?: string,
    public emailLogin?: string,
    public firstName?: string,
    public lastName?: string,
    public role?: RoleDto,
    public avatarUrl?: string,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
