import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {RequestDto} from '../../interfaces/member/request.dto';

export const requestListDataSuccess = createAction(
  "[Request List State] Request list data success",
  props<{ requestListData: PaginatedListDataInterface<RequestDto> }>()
);

export const requestListDataClear = createAction(
  "[Request List State] Request list data clear",
);
