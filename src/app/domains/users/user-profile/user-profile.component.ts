import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {Subject, takeUntil} from 'rxjs';
import {UserDto} from '../../../interfaces/user/user.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {currentUserSuccess} from '../../../state/current-user';
import {User} from '../../../interfaces/user/user.interface';
import {AuthService} from '../../../services/auth/auth.service';
import {authUserDataSuccess} from '../../../state/core';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public isEditing: boolean = false;
  public user: UserDto | null = null;
  private storedUser: UserDto | null = null;
  public editUserForm: FormGroup;
  public selectedFile: File | null = null;
  public avatarPreviewUrl: string | ArrayBuffer | null = null;
  public editDisabled: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
    private authService: AuthService,
  ) {
    this.editUserForm = this.editUserFormInit();
  }

  public ngOnInit(): void {
    this.userSubscribe();
    this.checkUserIdAndUpdateCurrentUserStore();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.userService.singleUserId$.next(undefined);
  }

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      this.storedUser = user;
    });
  }

  private setDefaultValues(): void {
    this.editUserForm.get('emailLogin')?.setValue(this.user?.emailLogin);
    if (this.user?.firstName) this.editUserForm.get('firstName')?.setValue(this.user.firstName);
    if (this.user?.lastName) this.editUserForm.get('lastName')?.setValue(this.user.lastName);
    if (this.user?.avatarUrl) this.avatarPreviewUrl = this.user.avatarUrl;
    this.editDisabled = this.user?.id !== this.storedUser?.id;
  }

  private checkUserIdAndUpdateCurrentUserStore(): void {
    this.userService.singleUserId$.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/users']);
      } else {
        this.subscribeToUserUpdates(id);
      }
    });
  }

  private subscribeToUserUpdates(id: string): void {
    this.userService.storedCurrentUserData$.pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(user => {
      if (user && user.id === id) {
        this.user = user;
        this.setDefaultValues();
      } else {
        this.getUserById(id);
      }
    });
  }

  private getUserById(id: string): void {
    this.spinner.show();
    this.userService.getUserById(id).then(user => {
      this.store$.dispatch(currentUserSuccess({user: user}));
    }).finally(() => this.spinner.hide());
  }

  public editUserFormInit(): FormGroup {
    return this.formBuilder.group({
      emailLogin: [{value: undefined, disabled: true}, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      lastName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      password: [undefined],
      passwordConfirm: [undefined]
    })
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public cancelEdit(): void {
    this.isEditing = false;
    this.setDefaultValues();
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.avatarPreviewUrl = reader.result);
      reader.readAsDataURL(file);
    } else {
      this.toastrService.error('Only JPG and PNG files are allowed.');
    }
  }

  public saveChanges(): void {
    if (this.editUserForm.get('password')?.value && (this.editUserForm.get('password')?.value !== this.editUserForm.get('passwordConfirm')?.value)) {
      this.toastrService.error('The \'password\' and \'confirm password\' fields don\'t match.');
      return;
    }
    const newUserData: User = {};
    const formData = new FormData();
    if (this.editUserForm.get('password')?.value) newUserData.password = this.editUserForm.get('password')?.value;
    if (this.editUserForm.get('firstName')?.value !== this.user?.firstName) newUserData.firstName = this.editUserForm.get('firstName')?.value || '';
    if (this.editUserForm.get('lastName')?.value !== this.user?.lastName) newUserData.lastName = this.editUserForm.get('lastName')?.value || '';
    if (this.editUserForm.get('emailLogin')?.value !== this.user?.emailLogin) newUserData.emailLogin = this.editUserForm.get('emailLogin')?.value;
    if (!this.avatarPreviewUrl) newUserData.avatarUrl = '';
    formData.append('userData', JSON.stringify(newUserData));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.spinner.show();
    this.userService.updateUser(formData).then(user => {
      this.userService.needReloadUsersListData$.next(true);
      this.store$.dispatch(currentUserSuccess({user: user}));
      this.store$.dispatch(authUserDataSuccess({authUserData: user}));
      this.toastrService.success('The user was successfully updated.');
      this.editUserForm.get('passwordConfirm')?.setValue(undefined);
      this.editUserForm.get('password')?.setValue(undefined);
      this.toggleEdit();
    }).finally(() => this.spinner.hide());
  }

  public deleteAvatar(): void {
    this.avatarPreviewUrl = null;
    this.selectedFile = null;
  }
}
