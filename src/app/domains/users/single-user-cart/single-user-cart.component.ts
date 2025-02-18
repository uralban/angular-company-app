import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from '../../../interfaces/user/user.dto';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {UserService} from '../../../services/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {UniversalModalComponent} from '../../../widgets/universal-modal/universal-modal.component';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'single-user-cart',
  standalone: false,
  templateUrl: './single-user-cart.component.html'
})
export class SingleUserCartComponent implements OnInit, OnDestroy {
  @Input() user!: UserDto;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public deleteIsDisabled: boolean = false;
  public avatarUrl: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.avatarUrl = this.user.avatarUrl ? this.user.avatarUrl : environment.defaultUserAvatar;
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null): void => {
      if (user) {
        this.deleteIsDisabled = user.id !== this.user.id;
      }
    });
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public deleteUserConfirm(event: Event): void {
    event.stopPropagation();
    let userFullName: string = '';
    userFullName += this.user.firstName ? this.user.firstName : '';
    userFullName += this.user.lastName ? ' ' + this.user.lastName : '';
    const userName: string = userFullName.length ? userFullName : ''
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Delete User',
        message: 'Confirm to delete user ' + userName
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }

  private deleteUser(): void {
    this.spinner.show();
    this.userService.deleteUser().then(result => {
      this.userService.needReloadUsersListData$.next(true);
      this.toastrService.success(result.message);
      this.authService.needLogoutUser$.next(true);
    }).finally(() => this.spinner.hide());
  }

  public setUserName(): string {
    if (!this.user.firstName && !this.user.lastName) {
      return this.user.emailLogin || '';
    } else if (this.user.firstName && this.user.lastName) {
      return this.user.firstName + ' ' + this.user.lastName;
    } else {
      return this.user.firstName ? this.user.firstName : this.user.lastName || '';
    }
  }
}
