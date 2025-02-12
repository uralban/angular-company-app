import {DTO} from './dto.interface';
import {PaginationMetaDto} from './pagination-meta-dto';
import {ObjectFiller} from '../helpers/object-filter';

export class PaginationDto<T> implements DTO {

  data: T[];
  meta: PaginationMetaDto;

  constructor(itemConstructor: new (data?: any) => T, data?: any) {
    this.data = data?.data?.map((item: any) => new itemConstructor(item));
    this.meta = data?.meta;
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
