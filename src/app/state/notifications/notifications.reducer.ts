import {Action, createReducer, on} from '@ngrx/store';
import {initialState, NotificationsState} from '../notifications';
import * as NotificationsActions from '../notifications/notifications.actions';

const NotificationsReducer = createReducer(
  initialState,
  on(NotificationsActions.notificationsClear, (state, {}) => {
    return {
      ...state,
      notifications: null,
    }
  }),
  on(NotificationsActions.notificationsSuccess, (state, {notifications}) => {
    return {
      ...state,
      notifications,
    };
  }),
);

export function notificationsReducerFn(state: NotificationsState | undefined, action: Action) {
  return NotificationsReducer(state, action);
}
