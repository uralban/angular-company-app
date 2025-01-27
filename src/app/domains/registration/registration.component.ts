import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {RoleDto} from '../../interfaces/role-dto';

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

  public mockRoles: RoleDto[] = [
    new RoleDto('1', 'admin'),
    new RoleDto('2', 'user'),
  ];

  constructor(
    public formBuilder: FormBuilder,
    private readonly toastrService: ToastrService,
  ) {
    this.registrationForm = this.registrationFormInit();
    this.inputEmailSubjectSubscribe();
  }

  public ngOnInit() {
    this.registrationForm.get('role')?.setValue(this.mockRoles.find(role => role.roleName === 'user')?.id);
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public registrationFormInit(): FormGroup {
    return this.formBuilder.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      lastName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      role: [undefined, Validators.required],
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
      this.emailInputInvalidFlag = value.length ? !!this.registrationForm.get('email')?.invalid : false;
    });
  }

  public registration(): void {
    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('passwordConfirm')?.value) {
      this.toastrService.error('The password and confirm password fields don\'t match.');
      return;
    }
    this.registrationForm.reset();
    this.toastrService.success('You created an account, well done!');
  }

  public onInputChangeEmail(event: Event): void {
    if (this.registrationForm.get('email')?.value === '') {
      this.emailInputInvalidFlag = false;
      return;
    }
    this.inputEmailSubject.next((event.target as HTMLInputElement).value);
  }
}
