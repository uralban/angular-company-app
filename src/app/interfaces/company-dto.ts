import {DTO} from './dto.interface';
import {ObjectFiller} from '../helpers/object-filter';
import {UserDto} from './user-dto';

export class CompanyDto implements DTO{

  constructor(
    public id?: string,
    public companyName?: string,
    public companyDescription?: string,
    public logoUrl?: string,
    public visibility?: string,
    public user?: UserDto,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
