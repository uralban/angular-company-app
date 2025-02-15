import {CompanyDto} from '../../interfaces/company-dto';

export interface CurrentCompanyState {
  company: CompanyDto | null;
}

export const initialState: CurrentCompanyState = {
  company: null,
};
