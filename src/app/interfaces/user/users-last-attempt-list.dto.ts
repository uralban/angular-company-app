import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class UsersLastAttemptListDto implements DTO {

  constructor(
    public userId?: string,
    public userEmail?: string,
    public attemptId?: string,
    public attemptDate?: Date,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
