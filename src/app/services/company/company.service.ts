import { Injectable } from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {CompanyDto} from '../../interfaces/company/company.dto';
import {environment} from '../../../environments/environment';
import {select, Store} from '@ngrx/store';
import {selectCompanyListData} from '../../state/company-list/company-list.selector';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {PaginationRequestInterface} from '../../interfaces/pagination/pagination-request.interface';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {selectVisibilityListData} from '../../state/visibility-list/visibility-list.selector';
import {selectCurrentCompanyData} from '../../state/current-company';
import {ResultMessageDto} from '../../interfaces/result-message.dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends HttpService {

  private readonly URL_COMPANY: string;
  private readonly URL_VISIBILITY: string;

  public singleCompanyId: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public storedCompanyListData$: Observable<PaginatedListDataInterface<CompanyDto> | null>;
  public storedCurrentCompanyData$: Observable<CompanyDto | null>;
  public needReloadCompanyListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public needReloadCurrentCompanyData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public storedVisibilityListData$: Observable<string[] | null>;

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
    ) {
    super(httpClients);
    this.URL_COMPANY = environment.apiUrl + '/company';
    this.URL_VISIBILITY = environment.apiUrl + '/company/visibility-statuses';

    this.storedCompanyListData$ = this.store$.pipe(select(selectCompanyListData));
    this.storedCurrentCompanyData$ = this.store$.pipe(select(selectCurrentCompanyData));
    this.storedVisibilityListData$ = this.store$.pipe(select(selectVisibilityListData));
  }

  public async getAllCompanies(paginationRequest: PaginationRequestInterface): Promise<PaginationDto<CompanyDto>> {
    return lastValueFrom(super.getDataWithPagination(
      this.URL_COMPANY,
      (data) => new PaginationDto<CompanyDto>(CompanyDto, data),
      JSON.parse(JSON.stringify(paginationRequest))));
  }

  public async deleteCompanyById(companyId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_COMPANY + '/' + companyId, ResultMessageDto));
  }

  public async getCompanyById(companyId: string): Promise<CompanyDto> {
    return lastValueFrom(super.getOne(this.URL_COMPANY + '/' + companyId, CompanyDto, {}));
  }

  public async updateCompanyById(companyId: string, formData: FormData): Promise<CompanyDto> {
    return lastValueFrom(super.patchForResult(this.URL_COMPANY + '/' + companyId, CompanyDto, {}, formData));
  }

  public async getVisibilityList(): Promise<string[]> {
    return lastValueFrom(super.getAllForSimpleTypeResults<string>(this.URL_VISIBILITY, {}));
  }

  public async createCompany(formData: FormData): Promise<void> {
    return lastValueFrom(super.postForResponseStatus(this.URL_COMPANY, formData, {}));
  }

  public async updateVisibilityForAllCompanies(visibility: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_COMPANY, ResultMessageDto, {}, {'visibility': visibility}));
  }

}
