import {createAction, props} from '@ngrx/store';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';

export const notificationsSuccess = createAction(
  "[Notifications State] Notifications success",
  props<{ notifications: NotificationDto[] }>()
);

export const notificationsClear = createAction(
  "[Notifications State] Notifications clear",
);
