import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MemberDto} from '../../../../../interfaces/member/member.dto';
import {UserDto} from '../../../../../interfaces/user/user.dto';
import {environment} from '../../../../../../environments/environment';
import {MemberService} from '../../../../../services/member/member.service';
import {UniversalModalComponent} from '../../../../../widgets/universal-modal/universal-modal.component';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {CompanyService} from '../../../../../services/company/company.service';
import {ResultMessageDto} from '../../../../../interfaces/result-message.dto';
import {AuthService} from '../../../../../services/auth/auth.service';
import {QuizService} from '../../../../../services/quiz/quiz.service';
import {SelectFormatModalComponent} from '../../../../../widgets/select-format-modal/select-format-modal.component';

@Component({
  selector: 'member-cart',
  standalone: false,
  templateUrl: './member-cart.component.html'
})
export class MemberCartComponent implements OnInit, OnDestroy {
  @Input() member!: MemberDto;
  @Input() lastAttempt?: string | null = null;
  @Input() disableActions!: boolean;
  @Input() adminRoleId!: string | undefined;
  @Input() memberRoleId!: string | undefined;
  @Input() companyId!: string | undefined;

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);
  public avatarUrl: string = this.member?.user?.avatarUrl || environment.defaultUserAvatar;
  protected storedUser: UserDto | null = null;

  constructor(
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
    private spinner: PowerSpinnerService,
    private companyService: CompanyService,
    private authService: AuthService,
    private quizService: QuizService,
  ) {
  }

  public ngOnInit(): void {
    this.userSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      this.storedUser = user;
    });
  }

  public getUserName(): string {
    if (!this.member?.user?.firstName && !this.member?.user?.lastName) {
      return this.member?.user?.emailLogin || '';
    } else if (this.member?.user?.firstName && this.member?.user?.lastName) {
      return this.member?.user?.firstName + ' ' + this.member?.user?.lastName;
    } else {
      return this.member?.user?.firstName ? this.member?.user?.firstName : this.member?.user?.lastName || '';
    }
  }

  public createAdmin(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Role Change',
        message: 'Are you sure you want to change this member\'s role to admin?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.member.id && this.adminRoleId) {
        this.spinner.show();
        this.memberService.changeMemberRole(this.member.id, {roleId: this.adminRoleId}).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public createMember(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Role Change',
        message: 'Are you sure you want to change this member\'s role to member?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.member.id && this.memberRoleId) {
        this.spinner.show();
        this.memberService.changeMemberRole(this.member.id, {roleId: this.memberRoleId}).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public removeMember(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Remove member',
        message: 'Are you sure you want to remove this member from company?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.member.id) {
        this.spinner.show();
        this.memberService.removeMember(this.member.id).then((response: ResultMessageDto) => {
          this.toastrService.success(response.message);
          this.companyService.needReloadCurrentCompanyData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }

  public getCompanyMemberReport(): void {
    const dialogRef = this.dialog.open(SelectFormatModalComponent, {
      data: {
        title: 'Format select',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(format => {
      if (format) {
        if (this.companyId && this.member.user?.id) {
          this.spinner.show();
          this.quizService
            .getCompanyReport(format, {
              companyId: this.companyId,
              userId: this.member.user.id,
            })
            .subscribe({
              next: (response: { blob: Blob; filename: string }) => {
                const blobUrl: string = URL.createObjectURL(response.blob);
                const a: HTMLAnchorElement = document.createElement('a');
                a.href = blobUrl;
                a.download = response.filename || 'company_member_report.' + format;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
              },
              complete: () => this.spinner.hide()
            });
        }
      }
    });
  }
}
