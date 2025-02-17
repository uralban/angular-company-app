import {CompanyDto} from '../../interfaces/company-dto';
import {PaginatedListDataInterface} from '../../interfaces/paginated-list-data.interface';

export interface CompanyListState {
  companyListData: PaginatedListDataInterface<CompanyDto> | null;
}

export const initialState: CompanyListState = {
  companyListData: null,
};
