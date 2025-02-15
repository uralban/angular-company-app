import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DialogData} from '../../../interfaces/dialog-data.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {CompanyService} from '../../../services/company/company.service';
import {visibilityListSuccess} from '../../../state/visibility-list';
import {ToastrService} from 'ngx-toastr';
import {currentCompanyClear} from '../../../state/current-company';

@Component({
  selector: 'app-change-visibility-for-all-companies-modal',
  standalone: false,
  templateUrl: './change-visibility-for-all-companies-modal.component.html',
})
export class ChangeVisibilityForAllCompaniesModalComponent implements OnInit, OnDestroy {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public visibilityList: string[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public visibility: string | null = null;

  constructor(
    private companyService: CompanyService,
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
    private dialogRef: MatDialogRef<ChangeVisibilityForAllCompaniesModalComponent>,
  ) {

  }

  public ngOnInit(): void {
    this.getVisibilityListStoreSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getVisibilityListStoreSubscribe(): void {
    this.companyService.storedVisibilityListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(visibilityList => {
      if (visibilityList) {
        this.visibilityList = visibilityList;
      } else {
        this.getVisibilityList();
      }
    });
  }

  private getVisibilityList(): void {
    this.spinner.show();
    this.companyService.getVisibilityList().then((visibilityList: string[]): void => {
      this.store$.dispatch(visibilityListSuccess({visibilityList: visibilityList}));
    }).finally(() => this.spinner.hide());
  }

  public saveVisibility(): void {
    if (!this.visibility) {
      this.toastrService.error('Select visibility first');
      return;
    }
    this.spinner.show();
    this.companyService.updateVisibilityForAllCompanies(this.visibility).then(() => {
      this.companyService.needReloadCompanyListData$.next(true);
      this.store$.dispatch(currentCompanyClear());
      this.dialogRef.close(true);
    }).finally(() => this.spinner.hide());
  }

}
