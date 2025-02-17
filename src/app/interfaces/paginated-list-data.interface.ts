import {PaginationMetaDto} from './pagination-meta-dto';

export interface PaginatedListDataInterface<T> {
  data: T[],
  meta: PaginationMetaDto
}
