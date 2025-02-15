import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {RoleDto} from '../../interfaces/role-dto';
import {RegistrationService} from '../../services/registration/registration.service';
import {Router} from '@angular/router';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {RoleService} from '../../services/role/role.service';
import {Store} from '@ngrx/store';
import {rolesListSuccess} from '../../state/roles-list';
import {CreateUserInterface} from '../../interfaces/create-user.interface';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registrationForm: FormGroup;
  private inputEmailSubject: Subject<string> = new Subject<string>();
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public emailInputInvalidFlag: boolean = false;
  public emailExistFlag: boolean = true;
  public roleList: RoleDto[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private readonly toastrService: ToastrService,
    private registrationService: RegistrationService,
    private roleService: RoleService,
    private router: Router,
    private store$: Store,
    private spinner: PowerSpinnerService
  ) {
    this.registrationForm = this.registrationFormInit();
    this.inputEmailSubjectSubscribe();
  }

  public ngOnInit(): void {
    this.getRolesListStoreSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getRolesListStoreSubscribe(): void {
    this.roleService.storedRolesListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(rolesList => {
      if (rolesList) {
        this.roleList = rolesList;
        this.setDefaultUserRole();
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

  private setDefaultUserRole(): void {
    this.registrationForm.get('roleId')?.setValue(this.roleList.find(role => role.roleName === 'user')?.id);
  }

  public registrationFormInit(): FormGroup {
    return this.formBuilder.group({
      emailLogin: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      lastName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      roleId: [{value: undefined, disabled: true}, Validators.required],
      password: [undefined, Validators.required],
      passwordConfirm: [undefined, Validators.required],
    });
  }

  private inputEmailSubjectSubscribe(): void {
    this.inputEmailSubject.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      takeUntil(this.ngDestroy$)
    ).subscribe(value => {
      if (!value.length) {
        this.emailInputInvalidFlag = false;
        return;
      }
      if (this.registrationForm.get('emailLogin')?.invalid) {
        this.emailInputInvalidFlag = true;
        return;
      }
      this.registrationForm.get('emailLogin')?.disable();
      this.registrationService.getEmailExistStatus(this.registrationForm.get('emailLogin')?.value)
        .then((emailExist: string): void => {
          if (emailExist === 'emailExist') {
            this.emailInputInvalidFlag = true;
            this.toastrService.error('This email is already in use');
            return;
          }
          this.emailExistFlag = false;
          this.emailInputInvalidFlag = false;
        }).finally(() => this.registrationForm.get('emailLogin')?.enable());
      this.emailInputInvalidFlag = !!this.registrationForm.get('emailLogin')?.invalid;
    });
  }

  public registration(): void {
    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('passwordConfirm')?.value) {
      this.toastrService.error('The \'password\' and \'confirm password\' fields don\'t match.');
      return;
    }
    this.spinner.show();
    const newUserData: CreateUserInterface = {
      ...this.registrationForm.value,
      roleId: this.registrationForm.get('roleId')?.value,
    }
    this.registrationService.saveNewUser(newUserData).then(() => {
      this.toastrService.success('You created an account, well done!');
      this.router.navigate(['/auth']);
    }).finally(() => this.spinner.hide());
  }

  public onInputChangeEmail(event: Event): void {
    if (this.registrationForm.get('emailLogin')?.value === '') {
      this.emailInputInvalidFlag = false;
      return;
    }
    this.emailExistFlag = true;
    this.inputEmailSubject.next((event.target as HTMLInputElement).value);
  }
}
