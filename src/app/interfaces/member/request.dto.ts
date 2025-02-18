import {DTO} from '../dto.interface';
import {UserDto} from '../user/user.dto';
import {ObjectFiller} from '../../helpers/object-filter';
import {CompanyDto} from '../company/company.dto';

export class RequestDto implements DTO{

  constructor(
    public id?: string,
    public company?: CompanyDto,
    public requestedUser?: UserDto,
    public status?: string,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
