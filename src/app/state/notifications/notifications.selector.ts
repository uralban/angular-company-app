import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NotificationsState} from './notifications.state';

export const notificationsFeatureKey = 'notifications';

export const selectNotificationsStore = createFeatureSelector<NotificationsState>(notificationsFeatureKey);

export const selectNotifications = createSelector(
  selectNotificationsStore,
  (state: NotificationsState) => state.notifications,
);
