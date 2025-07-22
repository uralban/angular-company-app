import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CompanyDto} from '../../interfaces/company/company.dto';
import {PaginationMetaDto} from '../../interfaces/pagination/pagination-meta.dto';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company/company.service';
import {PageEvent} from '@angular/material/paginator';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {companyListDataSuccess} from '../../state/company-list';
import {CreateCompanyModalComponent} from './create-company-modal/create-company-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {
  ChangeVisibilityForAllCompaniesModalComponent
} from './change-visibility-for-all-companies-modal/change-visibility-for-all-companies-modal.component';

@Component({
  selector: 'app-companies',
  standalone: false,
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit, OnDestroy {

  public paginationMeta: PaginationMetaDto = new PaginationMetaDto(1, 3);
  public paginatedCompanyList: CompanyDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
  ) {
  }

  public ngOnInit() {
    this.getCompanyListStoreSubscribe();
    this.needReloadCompanyListDataSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public updatePaginateCompanyList(): void {
    this.spinner.show();
    this.companyService.getAllCompanies({
      page: this.paginationMeta.page,
      take: this.paginationMeta.take,
    }).then((paginationDto: PaginationDto<CompanyDto>): void => {
      this.store$.dispatch(companyListDataSuccess({companyListData: paginationDto}));
      this.companyService.needReloadCompanyListData$.next(false);
    }).finally(() => this.spinner.hide());
  }

  public onPageChange(event: PageEvent): void {
    this.paginationMeta.page = event.pageIndex + 1;
    this.paginationMeta.take = event.pageSize;
    this.updatePaginateCompanyList();
  }

  public openSinglePageCompany(company: CompanyDto): void {
    this.companyService.singleCompanyId.next(company.id as string);
    this.router.navigate(['companies/company-profile']);
  }

  private getCompanyListStoreSubscribe(): void {
    this.companyService.storedCompanyListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(companyListData => {
      if (companyListData) {
        this.paginatedCompanyList = companyListData.data;
        this.paginationMeta.itemCount = companyListData.meta.itemCount;
        this.paginationMeta.take = companyListData.meta.take;
        this.paginationMeta.page = companyListData.meta.page;
      }
    });
  }

  private needReloadCompanyListDataSubscribe(): void {
    this.companyService.needReloadCompanyListData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) this.updatePaginateCompanyList();
    });
  }

  public creteNewCompany(): void {
    const dialogRef = this.dialog.open(CreateCompanyModalComponent, {
      data: {
        title: 'Create Company'
      },
      width: '600px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.toastrService.success('The company was created successfully.');
      }
    });
  }

  public changeVisibilityForAllCompanies(): void {
    const dialogRef = this.dialog.open(ChangeVisibilityForAllCompaniesModalComponent, {
      data: {
        title: 'Change Visibility'
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.toastrService.success('The visibility was changed successfully.');
      }
    });
  }
}
