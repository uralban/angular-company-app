import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MemberDto} from '../../../../interfaces/member/member.dto';
import {UserDto} from '../../../../interfaces/user/user.dto';
import {ToastrService} from 'ngx-toastr';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UniversalModalComponent} from '../../../../widgets/universal-modal/universal-modal.component';
import {MemberService} from '../../../../services/member/member.service';
import {PowerSpinnerService} from '../../../../widgets/power-spinner/power-spinner.service';
import {RoleService} from '../../../../services/role/role.service';
import {Store} from '@ngrx/store';
import {RoleDto} from '../../../../interfaces/role/role.dto';
import {rolesListSuccess} from '../../../../state/roles-list';
import {ResultMessageDto} from '../../../../interfaces/result-message.dto';

@Component({
  selector: 'members',
  standalone: false,
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit, OnDestroy {
  @Input() members!: MemberDto[];
  @Input() storedUser!: UserDto | null;
  @Input() companyId!: string | undefined;
  @Input() isAdmin!: boolean;

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  private readonly dialog: MatDialog = inject(MatDialog);
  public userIsNotMember: boolean = true;
  public adminRoleId: string | undefined;
  public memberRoleId: string | undefined;

  constructor(
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
    private spinner: PowerSpinnerService,
    private roleService: RoleService,
    private store$: Store,
  ) {}

  public ngOnInit(): void {
    this.checkUserIsNotMember();
    this.getRolesListStoreSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getRolesListStoreSubscribe(): void {
    this.roleService.storedRolesListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(rolesList => {
      if (rolesList) {
        this.adminRoleId = rolesList.find(role => role.roleName === 'admin')?.id;
        this.memberRoleId = rolesList.find(role => role.roleName === 'member')?.id;
      } else {
        this.getRoles();
      }
    });
  }

  private getRoles(): void {
    this.spinner.show();
    this.roleService.getRoles().then((roles: RoleDto[]): void => {
      this.store$.dispatch(rolesListSuccess({rolesList: roles}));
    }).finally(() => this.spinner.hide());
  }

  public checkUserIsNotMember(): boolean {
    return this.members.findIndex(member => member.user?.id === this.storedUser?.id) === -1;
  }

  public createNewRequest(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Join request',
        message: 'Are you sure you want to join to this company?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.companyId && this.storedUser?.id) {
        this.spinner.show();
        this.memberService.createRequest({
          companyId: this.companyId,
          userId: this.storedUser.id
        }).then((response: ResultMessageDto) => {
          this.memberService.needReloadRequestsListData$.next(true);
          this.toastrService.success(response.message);
        }).finally(() => this.spinner.hide());
      }
    });
  }
}
