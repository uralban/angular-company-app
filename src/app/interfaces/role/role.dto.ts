import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class RoleDto implements DTO{

  constructor(
    public id?: string,
    public roleName?: string,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
