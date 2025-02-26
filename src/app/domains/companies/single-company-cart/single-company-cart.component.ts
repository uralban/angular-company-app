import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {CompanyDto} from '../../../interfaces/company/company.dto';
import {environment} from '../../../../environments/environment';
import {Subject, takeUntil} from 'rxjs';
import {UserDto} from '../../../interfaces/user/user.dto';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth/auth.service';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {CompanyService} from '../../../services/company/company.service';
import {UniversalModalComponent} from '../../../widgets/universal-modal/universal-modal.component';

@Component({
  selector: 'single-company-cart',
  standalone: false,
  templateUrl: './single-company-cart.component.html'
})
export class SingleCompanyCartComponent implements OnInit, OnDestroy {
  @Input() company!: CompanyDto;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public deleteIsDisabled: boolean = false;
  public logoUrl: string = '';

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.logoUrl = this.company.logoUrl ? this.company.logoUrl : environment.defaultCompanyLogo;
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null): void => {
      if (user) {
        this.deleteIsDisabled = this.company.owner?.emailLogin !== user.emailLogin;
      }
    });
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public deleteCompanyConfirm(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Delete Company',
        message: 'Confirm to delete company ' + this.company.companyName
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.deleteCompany();
      }
    });
  }

  private deleteCompany(): void {
    this.spinner.show();
    this.companyService.deleteCompanyById(this.company.id as string).then(result => {
      this.companyService.needReloadCompanyListData$.next(true);
      this.toastrService.success(result.message);
    }).finally(() => this.spinner.hide());
  }
}
