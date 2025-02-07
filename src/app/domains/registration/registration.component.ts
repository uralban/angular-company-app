import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {RoleDto} from '../../interfaces/role-dto';
import {RegistrationService} from '../../services/registration/registration.service';
import {CreateUserInterface} from '../../interfaces/create-user.interface';
import {Router} from '@angular/router';

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
    private router: Router
  ) {
    this.registrationForm = this.registrationFormInit();
    this.inputEmailSubjectSubscribe();
  }

  public ngOnInit(): void {
    this.getRoles();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getRoles(): void {
    this.registrationService.getRoles().then((roles: RoleDto[]): void => {
      this.roleList = roles;
      this.setDefaultUserRole();
    });
  }

  private setDefaultUserRole(): void {
    this.registrationForm.get('role')?.setValue(this.roleList.find(role => role.roleName === 'user')?.id);
  }

  public registrationFormInit(): FormGroup {
    return this.formBuilder.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      lastName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      role: [{value: undefined, disabled: true}, Validators.required],
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
      if (this.registrationForm.get('email')?.invalid) {
        this.emailInputInvalidFlag = true;
        return;
      }
      this.registrationService.getEmailExistStatus(this.registrationForm.get('email')?.value)
        .then((emailExist: string): void => {
          if (emailExist === 'emailExist') {
            this.emailInputInvalidFlag = true;
            this.toastrService.error('This email is already in use');
            return;
          }
          this.emailExistFlag = false;
          this.emailInputInvalidFlag = false;
        })
      this.emailInputInvalidFlag = !!this.registrationForm.get('email')?.invalid;
    });
  }

  public registration(): void {
    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('passwordConfirm')?.value) {
      this.toastrService.error('The \'password\' and \'confirm password\' fields don\'t match.');
      return;
    }
    this.registrationService.saveNewUser(this.registrationForm.value).then(() => {
      this.toastrService.success('You created an account, well done!');
      this.router.navigate(['/auth']);
    });
  }

  public onInputChangeEmail(event: Event): void {
    if (this.registrationForm.get('email')?.value === '') {
      this.emailInputInvalidFlag = false;
      return;
    }
    this.emailExistFlag = true;
    this.inputEmailSubject.next((event.target as HTMLInputElement).value);
  }
}
