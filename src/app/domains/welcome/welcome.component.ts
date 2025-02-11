import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {authUserDataSuccess} from '../../state/core';
import {UserDto} from '../../interfaces/user-dto';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';

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
        this.authService.getMeData().then((userMe: UserDto): void => {
          this.store$.dispatch(authUserDataSuccess({authUserData: userMe}));
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
