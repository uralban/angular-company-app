import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {authUserDataSuccess} from '../../state/core';
import {UserDto} from '../../interfaces/user/user.dto';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';
import {notificationsSuccess} from '../../state/notifications';

@Component({
  selector: 'app-welcome',
  standalone: false,

  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public userName: string | undefined;
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private store$: Store,
    public auth0: Auth0Service,
    private spinner: PowerSpinnerService,
    private notificationService: NotificationService,
  ) {

  }

  public ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null): void => {
      if (user) {
        this.userName = user.firstName + ' ' + user.lastName;
      }
    });
    this.auth0.isAuthenticated$.pipe(takeUntil(this.ngDestroy$)).subscribe((isAuthenticated: boolean): void => {
      if (isAuthenticated && !this.userName) {
        this.spinner.show();
        Promise.all([
          this.authService.getMeData(),
          this.notificationService.getAllNotifications()
        ]).then(([userMe, notifications]: [UserDto, NotificationDto[]]): void => {
          this.store$.dispatch(authUserDataSuccess({authUserData: userMe}));
          this.store$.dispatch(notificationsSuccess({notifications}));
          localStorage.setItem('login', new Date().getTime().toString());
        }).finally(() => {
          this.spinner.hide();
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
