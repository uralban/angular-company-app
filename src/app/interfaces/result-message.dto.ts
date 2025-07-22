import {DTO} from './dto.interface';
import {ObjectFiller} from '../helpers/object-filter';

export class ResultMessageDto implements DTO {

  constructor(
    public message?: string,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
