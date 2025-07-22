import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class PaginationMetaDto implements DTO {

  constructor(
    public page: number,
    public take: number,
    public itemCount?: number,
    public pageCount?: number,
    public hasPreviousPage?: boolean,
    public hasNextPage?: boolean
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
