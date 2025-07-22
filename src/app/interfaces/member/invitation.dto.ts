import {DTO} from '../dto.interface';
import {CompanyDto} from '../company/company.dto';
import {UserDto} from '../user/user.dto';
import {ObjectFiller} from '../../helpers/object-filter';

export class InvitationDto implements DTO {

  constructor(
    public id?: string,
    public company?: CompanyDto,
    public invitedUser?: UserDto,
    public invitedBy?: UserDto,
    public status?: string,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
