import {Component, inject, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UniversalModalComponent} from '../../widgets/universal-modal/universal-modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  private readonly dialog: MatDialog = inject(MatDialog);
  public loginForm: FormGroup;
  private inputEmailSubject: Subject<string> = new Subject<string>();
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public emailInputInvalidFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly toastrService: ToastrService,
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
      debounceTime(2000),
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
    this.loginForm.reset();
    this.toastrService.success('Welcome, user');
  }

  public testModalOpen(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Modal title',
        message: 'Modal test pass!'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastrService.success('You press \'Confirm\'');
        return;
      }
      this.toastrService.warning('You press \'Cancel\'');
    });
  }
}
