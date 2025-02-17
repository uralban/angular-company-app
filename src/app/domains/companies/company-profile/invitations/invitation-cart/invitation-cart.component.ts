import {Component, inject, Input, OnDestroy} from '@angular/core';
import {InvitationDto} from '../../../../../interfaces/member/invitation.dto';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {MemberService} from '../../../../../services/member/member.service';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {CompanyService} from '../../../../../services/company/company.service';
import {UniversalModalComponent} from '../../../../../widgets/universal-modal/universal-modal.component';
import {ResultMessageDto} from '../../../../../interfaces/result-message.dto';

@Component({
  selector: 'invitation-cart',
  standalone: false,
  templateUrl: './invitation-cart.component.html'
})
export class InvitationCartComponent implements OnDestroy {
  @Input() invite!: InvitationDto;

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);
  public avatarUrl: string = this.invite?.invitedUser?.avatarUrl || environment.defaultUserAvatar;

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
    if (!this.invite?.invitedUser?.firstName && !this.invite?.invitedUser?.lastName) {
      return this.invite?.invitedUser?.emailLogin || '';
    } else if (this.invite?.invitedUser?.firstName && this.invite?.invitedUser?.lastName) {
      return this.invite?.invitedUser?.firstName + ' ' + this.invite?.invitedUser?.lastName;
    } else {
      return this.invite?.invitedUser?.firstName ? this.invite?.invitedUser?.firstName : this.invite?.invitedUser?.lastName || '';
    }
  }

  public declineInvite(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Decline invite',
        message: 'Are you sure you want to decline this invite?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.invite?.id) {
        this.spinner.show();
        this.memberService.declineInvite(this.invite.id).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }
}
