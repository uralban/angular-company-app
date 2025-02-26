import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {CompanyDto} from '../../interfaces/company/company.dto';

export const companyListDataSuccess = createAction(
  "[Company List State] Company list data success",
  props<{ companyListData: PaginatedListDataInterface<CompanyDto> }>()
);

export const companyListDataClear = createAction(
  "[Company List State] Company list data clear",
);
