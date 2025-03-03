import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DialogData} from '../../../interfaces/dialog-data.interface';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {format} from 'date-fns';
import {NotificationStatus} from '../../../consts/notification-status.enum';
import {NotificationService} from '../../../services/notification/notification.service';
import {NotificationDto} from '../../../interfaces/notifications/notification.dto';
import {ResultMessageDto} from '../../../interfaces/result-message.dto';
import {notificationsSuccess} from '../../../state/notifications';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgStyle
  ]
})
export class NotificationsModalComponent implements OnInit, OnDestroy {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  protected readonly NotificationStatus = NotificationStatus;
  public notificationsList: NotificationDto[] = [];

  constructor(
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
    private dialogRef: MatDialogRef<NotificationsModalComponent>,
    private notificationService: NotificationService
  ) {

  }

  public ngOnInit() {
    this.notificationsList = JSON.parse(JSON.stringify(this.data.notifications));
  }

  public ngOnDestroy() {
    this.store$.dispatch(notificationsSuccess({notifications: this.notificationsList}));
  }

  public getLastNotificationTime(date: Date | undefined): string | undefined {
    if (date) return format(date, 'dd.MM.yy HH:mm');
    return undefined;
  }

  public markAsRead(notification: NotificationDto): void {
    if (notification.id) {
      this.spinner.show();
      this.notificationService.markNotificationIsRead(notification.id).then((result: ResultMessageDto) => {
        this.notificationsList = this.notificationsList.map((notif: NotificationDto) => {
          if (notif.id === notification.id) {
            notif.status = NotificationStatus.READ;
          }
          return notif;
        });
        this.toastrService.success(result.message);
      }).finally(() => this.spinner.hide());
    }
  }
}
