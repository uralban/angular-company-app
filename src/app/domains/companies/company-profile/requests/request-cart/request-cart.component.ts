import {Component, inject, Input, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../../environments/environment';
import {RequestDto} from '../../../../../interfaces/member/request.dto';
import {ToastrService} from 'ngx-toastr';
import {MemberService} from '../../../../../services/member/member.service';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {CompanyService} from '../../../../../services/company/company.service';
import {Subject, takeUntil} from 'rxjs';
import {UniversalModalComponent} from '../../../../../widgets/universal-modal/universal-modal.component';
import {ResultMessageDto} from '../../../../../interfaces/result-message.dto';

@Component({
  selector: 'request-cart',
  standalone: false,
  templateUrl: './request-cart.component.html'
})
export class RequestCartComponent implements OnDestroy {
  @Input() request!: RequestDto;

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);
  public avatarUrl: string = this.request?.requestedUser?.avatarUrl || environment.defaultUserAvatar;

  constructor(
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
    private spinner: PowerSpinnerService,
    private companyService: CompanyService,
  ) {
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public getUserName(): string {
    if (!this.request?.requestedUser?.firstName && !this.request?.requestedUser?.lastName) {
      return this.request?.requestedUser?.emailLogin || '';
    } else if (this.request?.requestedUser?.firstName && this.request?.requestedUser?.lastName) {
      return this.request?.requestedUser?.firstName + ' ' + this.request?.requestedUser?.lastName;
    } else {
      return this.request?.requestedUser?.firstName ? this.request?.requestedUser?.firstName : this.request?.requestedUser?.lastName || '';
    }
  }

  public acceptRequest(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Accept request',
        message: 'Are you sure you want to accept this request?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.request?.id) {
        this.spinner.show();
        this.memberService.acceptRequest(this.request.id).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public declineRequest(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Decline request',
        message: 'Are you sure you want to decline this request?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.request?.id) {
        this.spinner.show();
        this.memberService.declineRequest(this.request.id).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }
}
