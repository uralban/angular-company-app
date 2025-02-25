import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserDto} from '../../interfaces/user/user.dto';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {HealthCheckComponent} from '../../widgets/health-check/health-check.component';
import {NgIf} from '@angular/common';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {Store} from '@ngrx/store';
import {authUserDataClear} from '../../state/core';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user/user.service';
import {currentUserClear} from '../../state/current-user';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    HealthCheckComponent,
    NgIf
  ],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {

  public userName: string | undefined;
  public userId: string | undefined;
  public avatarUrl: string = '';

  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    public auth0: Auth0Service,
    private userService: UserService,
    private store$: Store,
    private spinner: PowerSpinnerService,
    private router: Router
  ) {}


  public ngOnInit(): void {
    this.userSubscribe();
    this.needLogoutSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      if (user) {
        this.userName = this.setUserName(user);
        this.userId = user.id;
        this.avatarUrl = user.avatarUrl || environment.defaultUserAvatar;
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
}
