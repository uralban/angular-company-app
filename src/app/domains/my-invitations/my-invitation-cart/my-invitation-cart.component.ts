import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {InvitationDto} from '../../../interfaces/member/invitation.dto';
import {MatDialog} from '@angular/material/dialog';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import {UniversalModalComponent} from '../../../widgets/universal-modal/universal-modal.component';
import {MemberService} from '../../../services/member/member.service';
import {CompanyService} from '../../../services/company/company.service';

@Component({
  selector: 'my-invitation-cart',
  standalone: false,
  templateUrl: './my-invitation-cart.component.html'
})
export class MyInvitationCartComponent implements OnInit, OnDestroy {
  @Input() invite!: InvitationDto;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public logoUrl: string = '';

  constructor(
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
    private companyService: CompanyService,
  ) {
  }

  public ngOnInit(): void {
    this.logoUrl = this.invite?.company?.logoUrl ? this.invite.company.logoUrl : environment.defaultCompanyLogo;
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public acceptInvitation(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Accept Invite',
        message: 'Are you sure you want to accept Invite?',
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.invite.id) {
        this.spinner.show();
        this.memberService.acceptInvite(this.invite.id).then(response => {
          this.toastrService.success(response.message);
          this.memberService.needReloadInvitationsListData$.next(true);
          this.memberService.needReloadRequestsListData$.next(true);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public declineInvitation(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Decline Invite',
        message: 'Are you sure you want to decline Invite?',
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.invite.id) {
        this.spinner.show();
        this.memberService.declineInvite(this.invite.id).then(response => {
          this.toastrService.success(response.message);
          this.memberService.needReloadInvitationsListData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

}
