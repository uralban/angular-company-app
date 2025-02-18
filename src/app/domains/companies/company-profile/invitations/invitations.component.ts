import {Component, inject, Input, OnDestroy} from '@angular/core';
import {InvitationDto} from '../../../../interfaces/member/invitation.dto';
import {MatDialog} from '@angular/material/dialog';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {MemberService} from '../../../../services/member/member.service';
import {CreateInvitationInterface} from '../../../../interfaces/member/create-invitation.interface';
import {CreateInvitationModalComponent} from './create-invitation-modal/create-invitation-modal.component';
import {CompanyService} from '../../../../services/company/company.service';
import {MemberDto} from '../../../../interfaces/member/member.dto';

@Component({
  selector: 'invitations',
  standalone: false,
  templateUrl: './invitations.component.html'
})
export class InvitationsComponent implements OnDestroy {
  @Input() invites!: InvitationDto[];
  @Input() members!: MemberDto[];
  @Input() storedUserId!: string | undefined;
  @Input() companyId!: string | undefined;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
    private companyService: CompanyService,
  ) {
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public createNewInvite(): void {
    const dialogRef = this.dialog.open(CreateInvitationModalComponent, {
      data: {
        title: 'Create Invite',
        members: this.members,
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.storedUserId && this.companyId) {
        const newInvite: CreateInvitationInterface = {
          userId: this.storedUserId,
          companyId: this.companyId,
          invitedUserId: result
        }
        this.spinner.show();
        this.memberService.createInvite(newInvite).then(response => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }
}
