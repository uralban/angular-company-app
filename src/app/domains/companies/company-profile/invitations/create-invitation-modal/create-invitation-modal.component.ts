import {Component, EventEmitter, inject, OnDestroy, OnInit} from '@angular/core';
import {DialogData} from '../../../../../interfaces/dialog-data.interface';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {UserDto} from '../../../../../interfaces/user/user.dto';
import {ToastrService} from 'ngx-toastr';
import {UniversalModalComponent} from '../../../../../widgets/universal-modal/universal-modal.component';
import {UserService} from '../../../../../services/user/user.service';

@Component({
  selector: 'app-create-invitation-modal',
  standalone: false,
  templateUrl: './create-invitation-modal.component.html'
})
export class CreateInvitationModalComponent implements OnInit, OnDestroy {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly dialog: MatDialog = inject(MatDialog);

  public userList: UserDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public invitedUserId: string | undefined;
  public userLoading: boolean = false;
  public searchUser: any = new EventEmitter<string>();

  constructor(
    private readonly toastrService: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateInvitationModalComponent>,
  ) {
  }

  public ngOnInit(): void {
    this.userInputSubscribe();
    this.usersListSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private userInputSubscribe() {
    this.searchUser.pipe(
      debounceTime(2000),
    ).subscribe((inputText: string) => {
      if (inputText && inputText.trim().length) {
        this.userLoading = true;
        this.userService.getUserListByName(inputText, this.data.members)
          .finally(() => this.userLoading = false);
      } else {
        this.userList = [];
      }
    });
  }

  private usersListSubscribe(): void {
    this.userService.userList.get().subscribe((userList: UserDto[]) => {
      this.userList = [...userList];
    });
  }

  public saveInvite(): void {
    if (!this.invitedUserId) {
      this.toastrService.error('Select user first');
      return;
    }
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Create invite',
        message: 'Are you sure you want to create new invite?',
      },
      width: '400px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result) {
        this.dialogRef.close(this.invitedUserId);
      }
    });
  }
}
