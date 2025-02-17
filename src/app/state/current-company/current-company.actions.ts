import {createAction, props} from '@ngrx/store';
import {CompanyDto} from '../../interfaces/company-dto';

export const currentCompanySuccess = createAction(
  "[Current Company State] Current company data success",
  props<{company: CompanyDto}>()
);

export const currentCompanyClear = createAction(
  "[Current Company State] Current company data clear",
);
