import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {Subject, takeUntil} from 'rxjs';
import {UserDto} from '../../../interfaces/user-dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleDto} from '../../../interfaces/role-dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public id: string | undefined;
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public isEditing: boolean = false;
  public user: UserDto = new UserDto('2', 'example@gmail.com', 'John2', 'Doe');
  public editUserForm: FormGroup;

  public mockRoles: RoleDto[] = [
    new RoleDto('1', 'admin'),
    new RoleDto('2', 'user'),
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.editUserForm = this.editUserFormInit();
  }

  public ngOnInit(): void {
    this.checkUserId();
    this.setDefaultValues();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.userService.singleUserId.next(undefined);
  }

  private setDefaultValues(): void {
    this.editUserForm.get('email')?.setValue(this.user.emailLogin);
    if (this.user.firstName) this.editUserForm.get('firstName')?.setValue(this.user.firstName);
    if (this.user.lastName) this.editUserForm.get('lastName')?.setValue(this.user.lastName);
    this.editUserForm.get('role')?.setValue(this.mockRoles.find(role => role.roleName === 'user')?.id);
  }

  private checkUserId(): void {
    this.userService.singleUserId.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/users']);
      } else {
        this.id = id;
      }
    });
  }

  public editUserFormInit(): FormGroup {
    return this.formBuilder.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      lastName: [undefined, Validators.pattern(/^([A-Za-z])+$/)],
      role: [undefined, Validators.required],
      password: [undefined, Validators.required],
      passwordConfirm: [undefined, Validators.required]
    })
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public saveChanges(): void {
    this.toggleEdit();
    this.toastr.success('Successfully updated user');
  }

  public deleteAvatar(): void {
    this.toastr.success('Successfully deleted avatar');
  }
}
