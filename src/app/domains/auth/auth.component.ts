import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {UserDto} from '../../interfaces/user/user.dto';
import {authUserDataSuccess} from '../../state/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';
import {notificationsSuccess} from '../../state/notifications';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  public loginForm: FormGroup;
  private inputEmailSubject: Subject<string> = new Subject<string>();
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public emailInputInvalidFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly toastrService: ToastrService,
    public auth0: Auth0Service,
    private authService: AuthService,
    private notificationService: NotificationService,
    private store$: Store,
    private spinner: PowerSpinnerService,
    private router: Router
  ) {
    this.loginForm = this.loginFormGroupInit();
    this.inputEmailSubjectSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private loginFormGroupInit(): FormGroup {
    return this.formBuilder.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [undefined, Validators.required]
    });
  }

  private inputEmailSubjectSubscribe(): void {
    this.inputEmailSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.ngDestroy$)
    ).subscribe(value => {
      this.emailInputInvalidFlag = value.length ? !!this.loginForm.get('email')?.invalid : false;
    });
  }

  public onInputChangeEmail(event: Event): void {
    if (this.loginForm.get('email')?.valid || this.loginForm.get('email')?.value === '') {
      this.emailInputInvalidFlag = false;
      return;
    }
    this.inputEmailSubject.next((event.target as HTMLInputElement).value);
  }

  public loginByEmail(): void {
    this.spinner.show();
    this.authService.loginByEmail(this.loginForm.value).then(() => {
      return Promise.all([
        this.authService.getMeData(),
        this.notificationService.getAllNotifications()
      ]);
    }).then(([userMe, notifications]: [UserDto, NotificationDto[]]): void => {
      this.store$.dispatch(authUserDataSuccess({authUserData: userMe}));
      this.store$.dispatch(notificationsSuccess({notifications}));
      localStorage.setItem('login', new Date().getTime().toString());
      this.loginForm.reset();
      this.router.navigateByUrl('/welcome')
    }).finally(() => this.spinner.hide());
  }

  public auth0Login(): void {
    this.auth0.loginWithRedirect();
  }
}
