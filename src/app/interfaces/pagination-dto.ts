import {DTO} from './dto.interface';
import {PaginationMetaDto} from './pagination-meta-dto';
import {ObjectFiller} from '../helpers/object-filter';

export class PaginationDto<T> implements DTO{

  constructor(
    public data: T[],
    public meta: PaginationMetaDto,
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
