import {CompanyDto} from '../../interfaces/company/company.dto';

export interface CurrentCompanyState {
  company: CompanyDto | null;
}

export const initialState: CurrentCompanyState = {
  company: null,
};
