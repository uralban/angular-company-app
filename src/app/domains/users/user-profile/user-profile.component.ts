import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {UserDto} from '../../../interfaces/user-dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleDto} from '../../../interfaces/role-dto';
import {ToastrService} from 'ngx-toastr';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {RoleService} from '../../../services/role/role.service';
import {rolesListSuccess} from '../../../state/roles-list';
import {Store} from '@ngrx/store';
import {currentUserSuccess} from '../../../state/current-user';
import {User} from '../../../interfaces/user.interface';
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
  private storedUser: UserDto| null = null;
  public editUserForm: FormGroup;
  public roleList: RoleDto[] = [];
  public selectedFile: File | null = null;
  public avatarPreviewUrl: string | ArrayBuffer | null = null;
  public editDisabled: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: PowerSpinnerService,
    private roleService: RoleService,
    private store$: Store,
    private readonly toastrService: ToastrService,
    private  authService: AuthService,
  ) {
    this.editUserForm = this.editUserFormInit();
  }

  public ngOnInit(): void {
    this.userSubscribe();
    this.getRolesListStoreSubscribe();
    this.checkUserIdAndUpdateCurrentUserStore();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.userService.singleUserId$.next(undefined);
  }

  private getRolesListStoreSubscribe(): void {
    this.roleService.storedRolesListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(rolesList => {
      if (rolesList) {
        this.roleList = rolesList;
      } else {
        this.getRoles();
      }
    });
  }

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      this.storedUser = user;
    });
  }

  private getRoles(): void {
    this.spinner.show();
    this.roleService.getRoles().then((roles: RoleDto[]): void => {
      this.store$.dispatch(rolesListSuccess({rolesList: roles}));
    }).finally(() => this.spinner.hide());
  }

  private setDefaultValues(): void {
    this.editUserForm.get('emailLogin')?.setValue(this.user?.emailLogin);
    if (this.user?.firstName) this.editUserForm.get('firstName')?.setValue(this.user.firstName);
    if (this.user?.lastName) this.editUserForm.get('lastName')?.setValue(this.user.lastName);
    if (this.user?.avatarUrl) this.avatarPreviewUrl = this.user.avatarUrl;
    this.editUserForm.get('role')?.setValue(this.roleList.find(role => role.id === this.user?.role?.id)?.id);
    this.editDisabled = this.user?.id !== this.storedUser?.id;
  }

  private checkUserIdAndUpdateCurrentUserStore(): void {
    this.userService.singleUserId$.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/users']);
      } else {
        this.roleService.storedRolesListData$.pipe(
          filter(roles => !!(roles && roles.length > 0)),
          take(1)
        ).subscribe(rolesList => {
          this.subscribeToUserUpdates(id);
        });
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
      role: [{value: undefined, disabled: true}, Validators.required],
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
    if (this.editUserForm.get('role')?.value !== this.user?.role?.id) newUserData.role = this.roleList.find(role => role.id === this.editUserForm.get('role')?.value);
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
