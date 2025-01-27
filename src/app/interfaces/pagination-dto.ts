import {DTO} from './dto.interface';
import {PaginationMetaDto} from './pagination-meta-dto';

export class PaginationDto<T> implements DTO{

  constructor(
    public data: T[],
    public meta: PaginationMetaDto,
  ) {}

  populateFromDTO(dto: any): void {
    this.data = dto['data'];
    this.meta = dto['meta'];
  }
}
