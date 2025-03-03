import {NotificationDto} from '../../interfaces/notifications/notification.dto';

export interface NotificationsState {
  notifications: NotificationDto[] | null;
}

export const initialState: NotificationsState = {
  notifications: null,
};
