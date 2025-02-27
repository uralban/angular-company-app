import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserDto} from '../../interfaces/user/user.dto';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {HealthCheckComponent} from '../../widgets/health-check/health-check.component';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {Store} from '@ngrx/store';
import {authUserDataClear} from '../../state/core';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user/user.service';
import {currentUserClear} from '../../state/current-user';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matModeComment} from '@ng-icons/material-icons/baseline';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';
import {NotificationStatus} from '../../consts/notification-status.enum';
import {NotificationsModalComponent} from './notifications-modal/notifications-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {ToastrService} from 'ngx-toastr';
import {notificationsSuccess} from '../../state/notifications';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    HealthCheckComponent,
    NgIcon
  ],
  templateUrl: './header.component.html',
  viewProviders: [provideIcons({matModeComment})]
})

export class HeaderComponent implements OnInit, OnDestroy {

  public userName: string | undefined;
  public userId: string | undefined;
  public avatarUrl: string = '';
  public notifications: NotificationDto[] = [];
  public notReadNotificationsCount: number = 0;
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    public auth0: Auth0Service,
    private userService: UserService,
    private notificationService: NotificationService,
    private store$: Store,
    private spinner: PowerSpinnerService,
    private router: Router,
    private readonly toastrService: ToastrService,
    private webSocketService: WebsocketService
  ) {
  }

  public ngOnInit(): void {
    this.userSubscribe();
    this.needLogoutSubscribe();
    this.notificationSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.webSocketService.disconnect();
  }

  private websocketSubscribe(): void {
    if (this.userId) {
      this.webSocketService.connect(this.userId);
      this.webSocketService.listenForNotifications().pipe(takeUntil(this.ngDestroy$)).subscribe((notification: NotificationDto) => {
        const newNotificationList: NotificationDto[] = this.notifications.concat(notification);
        this.store$.dispatch(notificationsSuccess({notifications: newNotificationList}));
      });
    }
  }

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      if (user) {
        this.userName = this.setUserName(user);
        this.userId = user.id;
        this.avatarUrl = user.avatarUrl || environment.defaultUserAvatar;
        this.websocketSubscribe();
      }
    });
  }

  private notificationSubscribe(): void {
    this.notificationService.notifications$.pipe(takeUntil(this.ngDestroy$)).subscribe((notifications: NotificationDto[] | null) => {
      if (notifications) {
        this.notifications = notifications;
        this.notReadNotificationsCount = notifications.filter(notification => notification.status === NotificationStatus.UNREAD).length;
      } else {
        this.notifications = [];
        this.notReadNotificationsCount = 0;
      }
    });
  }

  public needLogoutSubscribe(): void {
    this.authService.needLogoutUser$.pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.authService.needLogoutUser$.next(false);
        this.logout();
      }
    });
  }

  public logout(): void {
    this.auth0.isAuthenticated$.pipe(takeUntil(this.ngDestroy$)).subscribe((isAuth) => {
      this.store$.dispatch(authUserDataClear());
      if (isAuth) {
        localStorage.clear();
        this.auth0.logout({
          logoutParams: {
            returnTo: `${window.location.origin}/welcome`
          }
        });
        return;
      }
      this.spinner.show();
      this.authService.logout().then(() => {
        localStorage.clear();
        this.router.navigateByUrl('/welcome').then(() => {
          window.location.reload();
        });
      }).finally(() => this.spinner.hide());
    });
  }

  private setUserName(user: UserDto): string {
    if (!user.firstName && !user.lastName) {
      return user.emailLogin || '';
    } else if (user.firstName && user.lastName) {
      return user.firstName + ' ' + user.lastName;
    } else {
      return user.firstName ? user.firstName : user.lastName || '';
    }
  }

  public redirectToUserProfile(): void {
    if (this.userId) {
      this.store$.dispatch(currentUserClear());
      this.userService.singleUserId$.next(this.userId);
      this.router.navigate(['users/user-profile']);
    }
  }

  public showNotifications(): void {
    const dialogRef = this.dialog.open(NotificationsModalComponent, {
      data: {
        title: 'Change Visibility',
        notifications: this.notifications
      },
      width: '1000px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
      }
    });
  }
}
