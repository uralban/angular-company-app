import {OrderEnum} from '../consts/order.enum';

export interface PaginationRequestInterface {
  order?: OrderEnum,
  page: number,
  take: number,
}
