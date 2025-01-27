import {DTO} from './dto.interface';

export class PaginationMetaDto implements DTO{

  constructor(
    public page: number,
    public take: number,
    public itemCount: number,
    public pageCount: number,
    public hasPreviousPage: boolean,
    public hasNextPage: boolean
  ) {}

  populateFromDTO(dto: any): void {
    this.page = dto['page'];
    this.take = dto['take'];
    this.itemCount = dto['itemCount'];
    this.pageCount = dto['pageCount'];
    this.hasPreviousPage = dto['hasPreviousPage'];
    this.hasNextPage = dto['hasNextPage'];
  }
}
