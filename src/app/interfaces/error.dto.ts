import {DTO} from './dto.interface';
import {ObjectFiller} from '../helpers/object-filter';

export class ErrorDto implements DTO {

  constructor(
    public status_code?: number,
    public detail?: string,
    public result?: string
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
