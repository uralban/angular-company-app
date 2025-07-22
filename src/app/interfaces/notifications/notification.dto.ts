import {DTO} from '../dto.interface';
import {CompanyDto} from '../company/company.dto';
import {UserDto} from '../user/user.dto';
import {ObjectFiller} from '../../helpers/object-filter';
import {NotificationStatus} from '../../consts/notification-status.enum';

export class NotificationDto implements DTO {

  constructor(
    public id?: string,
    public text?: string,
    public status?: NotificationStatus,
    public user?: UserDto,
    public company?: CompanyDto,
    public createdAt?: Date,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
