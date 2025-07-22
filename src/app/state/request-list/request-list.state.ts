import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {RequestDto} from '../../interfaces/member/request.dto';

export interface RequestListState {
  requestListData: PaginatedListDataInterface<RequestDto> | null;
}

export const initialState: RequestListState = {
  requestListData: null,
};
