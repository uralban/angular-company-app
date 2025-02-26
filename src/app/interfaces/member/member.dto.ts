import {DTO} from '../dto.interface';
import {UserDto} from '../user/user.dto';
import {ObjectFiller} from '../../helpers/object-filter';
import {RoleDto} from '../role/role.dto';
import {CompanyDto} from '../company/company.dto';

export class MemberDto implements DTO{

  constructor(
    public id?: string,
    public user?: UserDto,
    public role?: RoleDto,
    public company?: CompanyDto,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
