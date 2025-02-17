import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/paginated-list-data.interface';
import {CompanyDto} from '../../interfaces/company-dto';

export const companyListDataSuccess = createAction(
  "[Company List State] Company list data success",
  props<{companyListData: PaginatedListDataInterface<CompanyDto>}>()
);

export const companyListDataClear = createAction(
  "[Company List State] Company list data clear",
);
