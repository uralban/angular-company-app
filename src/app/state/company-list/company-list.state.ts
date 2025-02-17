import {CompanyDto} from '../../interfaces/company/company.dto';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';

export interface CompanyListState {
  companyListData: PaginatedListDataInterface<CompanyDto> | null;
}

export const initialState: CompanyListState = {
  companyListData: null,
};
