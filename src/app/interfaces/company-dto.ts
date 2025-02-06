import {DTO} from './dto.interface';
import {ObjectFiller} from '../helpers/object-filter';

export class CompanyDto implements DTO{

  constructor(
    public id?: string,
    public name?: string
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
